var canvas = document.getElementById('workspace');
var context = canvas.getContext('2d');
var isMouseDown = false;

canvas.width = 500;
canvas.height = 500;

context.fillStyle = 'white';
context.fillRect(0, 0, 500, 500);
context.fillStyle = 'black';

canvas.addEventListener('mousedown', function() {
	isMouseDown = true;
});

canvas.addEventListener('mouseup', function() {
	isMouseDown = false;
	context.beginPath();
});

context.lineWidth = 5*2;
canvas.addEventListener("mousemove", function(e) {
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
});
