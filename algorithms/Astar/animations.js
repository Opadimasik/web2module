function colorCell(x, y, color){
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
    ctx.fill();
    ctx.stroke();
}

function cellsChangingAnimation(x, y, color){

    time += 5;
    k++;

    timeoutID[k] = setTimeout(function(){
        ctx.fillStyle = color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
        ctx.fill();
        ctx.stroke();
    }, time);
}
function cleanPath(){

    for(let i =0; i <= k; i++){
        clearTimeout(timeoutID[i]);
    }

    for(let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            if (arr[i][j] == 0){
                colorCell(i, j, "white")
            }
            else{
                colorCell(i, j, "black")
            }
        }
    }
    colorCell(startx, starty, "green");
    colorCell(endx, endy, "red");

    let button = document.getElementById("cleanPath");
    button.disabled = true;
}

function drawPath(cells, finish){
    let i = finish.x, j = finish.y;
    let pathI = [], pathJ = [];

    while(!(cells[i][j].parentx == i && cells[i][j].parenty == j)){
        let currentI = cells[i][j].parentx;
        let currentJ = cells[i][j].parenty;
        pathI.push(currentI);
        pathJ.push(currentJ);
        i = currentI;
        j = currentJ;
    }
    pathI.reverse();
    pathJ.reverse();
    for (let c = 1; c < pathI.length; c++){
        cellsChangingAnimation(pathI[c], pathJ[c], "coral");
    }
    let button = document.getElementById("cleanPath");
    button.disabled = false;
}