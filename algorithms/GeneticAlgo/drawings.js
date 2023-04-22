function drawVertex(x, y){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
}

function drawPath(array){
    for(let i = 0; i < amountOfpoints - 1; i++){
        drawEdge(array[i], array[i + 1]);
    }
    drawEdge(array[0], array[amountOfpoints - 1]);
}

function drawEdge(first, second){

    time += 20; 
    k++;
    timeoutID[k] = setTimeout(function(){
        ctx.beginPath(); 
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
    },time);
}

function drawFinalPath(array){
    for(let i = 0; i < amountOfpoints - 1; i++){
        drawFinalEdge(array[i], array[i + 1]);
    }
    drawFinalEdge(array[0], array[amountOfpoints - 1]);
}

function drawFinalEdge(first, second){
    time += 20; 
    k++;
    timeoutID[k] = setTimeout(function(){
        ctx.beginPath(); 
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "red";
        ctx.stroke();

        drawVertex(first.x, first.y);
        drawVertex(second.x, second.y);
    },time);
}

function redrawCanvas() {
    time += 20;
    k++;
    timeoutID[k] = setTimeout(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        for (let i = 0; i < amountOfpoints; i++) {
            let vertex = vertexes[i];
            drawVertex(vertex.x, vertex.y); 
        }
    }, time)
}