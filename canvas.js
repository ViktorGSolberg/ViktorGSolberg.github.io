
$(document).ready(function(){

	let c = document.getElementById("can");
	let ctx = c.getContext("2d");
	let i = 0;
	let shapes = [];
	let colors = [];

	// Animerer dokumentasjonen
	$("#bot").click(function(){
		$("#slider").slideToggle("slow");
	});

	// Flytter skjermen øverst på siden
	$("#topBtn").click(function(){
		document.body.scrollIntoView(true);
	});

	// Flytter skjermen nederst på siden
	$("#bottomBtn").click(function(){
		document.body.scrollIntoView(false);
	});

	// Forstørrer når musen kommer inn
	$(".navElement").mouseenter(function(){
		$(this).animate({width: "+=10px", height: "+=10px"}, "fast");

	});

	// Forsminsker når musen drar ut 
	$(".navElement").mouseleave(function(){
		$(this).animate({width: "-=10px", height: "-=10px"}, "fast");
	});

	// Tegner nye elementer på Canvas når musen drar ut
	$("#can").mouseleave(function(){
		drawArt();
	});

	// Sletter alle elementer på Canvas ved dobbelklikk
	$("#can").dblclick(function(){
		ctx.clearRect(0, 0, c.width, c.height);
	});

	/* Sjekker hvilken farge som er under musepeker ved klikk.
	   Dersom denne fargen befinner seg på et allerede tegnet element
	   vil dette elementet tegnes på nytt, med en ny tilfeldig farge.*/
	$('#can').click(function(e){
		let pos = findPos(this);
    	let x = e.pageX - pos.x;
    	let y = e.pageY - pos.y;
    	let coord = "x=" + x + ", y=" + y;
    	let c = this.getContext('2d');
    	let p = c.getImageData(x, y, 1, 1).data; 
    	let hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    	let color = hex.toUpperCase();

    	if(colors.includes(color)) {
    		let index = colors.indexOf(color);
    		let shape = shapes[index];
    		let fillC = getRandomColor();

    		if(shape.shapeType === "circle") {
    			ctx.beginPath();
				ctx.arc(shape.shapeX, shape.shapeY, shape.shapeR, 0, 2 * Math.PI);
				ctx.lineWidth = 1;
				ctx.fillStyle = fillC;
				ctx.fill();
				ctx.stroke();

				let circle = {
				shapeType: shape.shapeType,
				shapeX: shape.shapeX,
				shapeY: shape.shapeY,
				shapeR: shape.shapeR,
				shapeFill: fillC
			};

			shapes[index] = circle;
			colors[index] = fillC;

    		} else {
    			ctx.beginPath();
				ctx.rect(shape.shapeX, shape.shapeY, shape.shapeWidth, shape.shapeHeight);
				ctx.lineWidth = 1;
				ctx.fillStyle = fillC;
				ctx.fill();
				ctx.stroke();

				let rectangle = {
					shapeType: "rectangle",
					shapeX: shape.shapeX,
					shapeY: shape.shapeY,
					shapeWidth: shape.shapeWidth,
					shapeHeight: shape.shapeHeight,
					shapeFill: fillC
				};				

				shapes[index] = rectangle;
				colors[index] = fillC;
    		}
    	}
	});

	// Returnerer posisjon til musepeker
	function findPos(obj) {
    	let curleft = 0, curtop = 0;
    	if (obj.offsetParent) {
        	do {
            	curleft += obj.offsetLeft;
            	curtop += obj.offsetTop;
        	} while (obj = obj.offsetParent);
        	return { x: curleft, y: curtop };
    	}
    	return undefined;
}
	
	// Oversetter rgb farger til hexadesimalt
	function rgbToHex(r, g, b) {
    	if (r > 255 || g > 255 || b > 255)
        	throw "Invalid color component";
    	return ((r << 16) | (g << 8) | b).toString(16);
}
	
	// Returnerer en tilfeldig farge
	function getRandomColor() {
  		let letters = '0123456789ABCDEF';
  		let color = '#';
  		for (var i = 0; i < 6; i++) {
   			color += letters[Math.floor(Math.random() * 16)];
  		}
  		return color;
}
	
	// Tegner opp en sirkel av tilfeldig størrelse, på tilfeldig lokasjon med tilfeldig farge
	function drawRandomCircle() {

		let centerX = Math.ceil(Math.random()*500);
		let centerY = Math.ceil(Math.random()*250);
		let radius = Math.ceil(Math.random()*80)
		let fillC = getRandomColor();
		
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.lineWidth = 1;
		ctx.fillStyle = fillC;
		ctx.fill();
		ctx.stroke();

		let circle = {
			shapeType: "circle",
			shapeX: centerX,
			shapeY: centerY,
			shapeR: radius,
			shapeFill: fillC
		};

		shapes.push(circle);
		colors.push(fillC);
	}

	// Tegner opp et rektangel av tilfeldig størrelse, på tilfeldig lokasjon med tilfeldig farge
	function drawRandomRectangle() {

		let width = Math.ceil(Math.random() * 150);
		let height = Math.ceil(Math.random()* 100);
		let x = Math.ceil(Math.random()*500);
		let y = Math.ceil(Math.random()*300);
		let fillC = getRandomColor();

		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.lineWidth = 1;
		ctx.fillStyle = fillC;
		ctx.fill();
		ctx.stroke();

		let rectangle = {
			shapeType: "rectangle",
			shapeX: x,
			shapeY: y,
			shapeWidth: width,
			shapeHeight: height,
			shapeFill: fillC
		};

		shapes.push(rectangle);
		colors.push(fillC);
	}

	// Tegner opp 10 sirkler
	function drawMultipleCircles() {
		for (i=0;i<10;i++) {
		drawRandomCircle();
	}
}
	
	// Tegner opp 10 rektangler
	function drawMultipleRectangles() {
		for (i=0;i<10;i++) {
		drawRandomRectangle();
	}
}
	// Tegner opp tilfeldig kunst i Canvaset
	function drawArt() {
		c.style.background = getRandomColor();
		drawMultipleCircles();
		drawMultipleRectangles();
		console.log(shapes);
		console.log(colors);
	}
	drawArt();
});