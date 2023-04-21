const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", vertexCreate);
var amountOfpoints = 0;
var timeoutID = [];
var time = 0, k = 0;

function Point(x, y, n){
    this.x = x;
    this.y = y;
    this.number = n;
}

var vertexes = new Array;

function vertexCreate(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    
    for (let i = 0; i < vertexes.length; i++) {
      const vertex = vertexes[i];
      const distance = Math.sqrt((vertex.x - x) ** 2 + (vertex.y - y) ** 2);
      if (distance < 10) {
            vertexes.splice(i, 1); 
            amountOfpoints--;
            redrawCanvas(); 
            return;
        }
    }
    
    drawVertex(x, y);
    let coord = new Point(x, y, amountOfpoints);
    amountOfpoints++;
    vertexes.push(coord);
}

function clearCanvas(){
    canvas.addEventListener("click", vertexCreate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    amountOfpoints = 0; 
    vertexes = [];
    time = 0, k = 0;
    timeoutID = [];
}

function clearPath(){
    canvas.addEventListener("click", vertexCreate);
    redrawCanvas();
    time = 0, k = 0;
    timeoutID = [];
}