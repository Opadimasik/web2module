const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", vertexCreate);
var amountOfpoints = 0;
var timeoutID = [];
var time = 0, k = 0;; 

function Point(x, y, n){
    this.x = x;
    this.y = y;
    this.number = n;
}

var vertexes = new Array;

function vertexCreate(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    let coord = new Point(x, y, amountOfpoints);
    amountOfpoints++;
    vertexes.push(coord);
    ctx.stroke();
    ctx.fill();
}

function drawPath(array, color){
    for(let i = 0; i < amountOfpoints - 1; i++){
        drawEdge(array[i], array[i + 1], color);
    }
    drawEdge(array[0], array[amountOfpoints - 1]);
}

function drawEdge(first, second, color){
    time += 10; 
    k++;
    timeoutID[k] = setTimeout(function(){
        ctx.beginPath(); 
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.stroke();
    },time);
}
