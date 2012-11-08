window.onload = function () {
    draw();
}

function draw(){

    var canvas = document.getElementById('canvasBaboon'),
    context = canvas.getContext("2d"),
    cleanButton = document.getElementById('cleanButton');
    socket = io.connect('/');
    
    clean();

    function clean(){
		context.fillStyle = "blue";
		context.fillRect(0,0,canvas.width,canvas.height);
	}

    //Se inicia al trazo en las coordenadas indicadas.
	function startLine(e){
		context.beginPath();
		context.strokeStyle = "#fff";
		context.lineCap = "round";
		context.lineWidth = 5;
		context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
	}

	//Se termina el trazo.
	function closeLine(e){
		context.closePath();
	}

    //Dibujamos el trazo recibiendo la posición actual del ratón.
	function draw(e){

		context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
		context.stroke();

	}

    //Usamos la librería socket.io para comunicarnos con el servidor mediante websockets
	socket.on('connect', function () {
	    var click = false, //Cambia a true si el usuario esta pintando
			block = false; //Cambia a true si hay otro usuario pintando
	    //Al darle click al botón limpiar enviamos orden de devolver la pizarra a su estado inicial.
	    cleanButton.addEventListener("click", function () {

	        if (!block) {
	            socket.emit('clean', true);
	        }

	    }, false);

	    //Al clickar en la pizarra enviamos el punto de inicio del trazo
	    canvas.addEventListener("mousedown", function (e) {

	        if (!block) {
	            socket.emit('startLine', { clientX: e.clientX, clientY: e.clientY });
	            click = true;
	            startLine(e);
	        }

	    }, false);

	    //Al soltar el click (dentro o fuera del canvas) enviamos orden de terminar el trazo
	    window.addEventListener("mouseup", function (e) {

	        if (!block) {
	            socket.emit('closeLine', { clientX: e.clientX, clientY: e.clientY });
	            click = false;
	            closeLine(e);
	        }

	    }, false);

	    //Al mover el ratón mientras esta clickado enviamos coordenadas donde continuar el trazo.
	    canvas.addEventListener("mousemove", function (e) {

	        if (click) {
	            if (!block) {
	                socket.emit('draw', { clientX: e.clientX, clientY: e.clientY });
	                draw(e);
	            }
	        }

	    }, false);


	    //Recibimos mediante websockets las ordenes de dibujo	    
	    socket.on('down',function(e){
	        if(!click){
	            block = true;
	            startLine(e);
	        }
	    });

	    socket.on('up',function(e){
	        if(!click){
	            block = false;
	            closeLine(e);
	        }
	    });

	    socket.on('move',function(e){
	        if(block){
	            draw(e);
	        }
	    });

	    socket.on('clean',clean);

	    
	});

}