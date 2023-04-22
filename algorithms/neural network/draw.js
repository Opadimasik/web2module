var canvas = document.getElementById('workspace');
var context = canvas.getContext('2d');
var isMouseDown = false;
var usingPencil = false;
var usingBrush = false;
canvas.width = 500;
canvas.height = 500;

context.fillStyle = 'white';
context.fillRect(0, 0, 500, 500);
context.fillStyle = 'black';

function usePencil() {
	usingBrush = false;
	usingPencil = true;
	canvas.addEventListener('mousedown', function(){
		isMouseDown = true;
	});

	canvas.addEventListener('mouseup', function(){
		isMouseDown = false;
		context.beginPath();
	});

	canvas.addEventListener('mousemove', function(e){
		if(usingPencil) {
			if(isMouseDown) {
				var rect = canvas.getBoundingClientRect();
				var currentPositionX = e.clientX - rect.left;
				var currentPositionY = e.clientY - rect.top;
				var x = Math.floor(currentPositionX / 10) * 10;
				var y = Math.floor(currentPositionY / 10) * 10;
				context.beginPath();
				context.rect(x, y, 10, 10);
				context.fill();
				context.beginPath();
			}
		}
	});
};

function useBrush() {
	usingBrush = true;
	usingPencil = false;
	canvas.addEventListener('mousedown', function() {
		isMouseDown = true;
	});
	
	canvas.addEventListener('mouseup', function() {
		isMouseDown = false;
		context.beginPath();
	});
	
	context.lineWidth = 10;
	canvas.addEventListener("mousemove", function(e) {
		if(usingBrush) {
			if(isMouseDown) {
				var rect = canvas.getBoundingClientRect();
				context.lineTo(e.clientX - rect.left, e.clientY-rect.top);
				context.stroke();
				context.beginPath();
				context.arc(e.clientX - rect.left, e.clientY-rect.top, 5, 0, Math.PI * 2);
				context.fill();
				context.beginPath();
				context.moveTo(e.clientX - rect.left, e.clientY-rect.top);
			}
		}
	});
};

function clearCanvas() {
	usingBrush = false;
	usingPencil = false;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'white';
	context.fillRect(0, 0, 500, 500);
	context.fillStyle = 'black';
	document.getElementById("answer").innerHTML = "";
}