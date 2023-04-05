var ctx, canvas, size, cellSize;
var hasStart = false, hasEnd = false;
var startx = -1, starty = -1;
var endx = -1, endy = -1;
var painting = false;
var attribute;
var time = 0;
var k = -1;
var timeoutID =[];

var arr = new Array(100);
for (let i =0; i < 100; i++){
    arr[i] = new Array(100);
}

function createMap(){
 
    let button = document.getElementById("cleanPath");
    button.disabled = true;
    button = document.getElementById("findPath");
    button.disabled = true;
    
    canvas = document.querySelector("canvas");
    size = document.getElementById("size").value;
    canvas.width = 1100;
    canvas.height = 1100;

    cellSize = canvas.width / size;
    ctx = canvas.getContext("2d");
    
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){

           arr[i][j] = 0;
        }
    }
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){

            colorCell(i, j, "white");
        }
    }
    if(size > 3 ){
       generateMaze();
    }
}

function addStartPoint(){
    canvas.removeEventListener("mousedown", startPos);
    canvas.removeEventListener("mouseup", endPos);
    canvas.removeEventListener("mousemove", wallClick);
    canvas.removeEventListener("click", endClick);
    canvas.removeEventListener("mousemove", endHover);
    cleanHovers();
    canvas.addEventListener('mousemove', startHover);
    canvas.addEventListener("click", startClick);
}

function addEndPoint(){
    canvas.removeEventListener("mousedown", startPos);
    canvas.removeEventListener("mouseup", endPos);
    canvas.removeEventListener("mousemove", wallClick);
    canvas.removeEventListener("click", startClick);
    canvas.removeEventListener("mouseover", startHover);
    cleanHovers();
    canvas.addEventListener("mousemove", endHover);
    canvas.addEventListener("click", endClick);
}

function addWall(){
    canvas.removeEventListener("click", endClick);
    canvas.removeEventListener("click", startClick);
    canvas.removeEventListener("mousemove", startHover);
    canvas.removeEventListener("mousemove", endHover);
    cleanHovers();
    canvas.addEventListener("mousedown", startPos);
    canvas.addEventListener("mouseup", endPos);
    canvas.addEventListener("mousemove", wallClick);
}

function startPos(e){
    painting = true;
    var x = e.pageX - 100;
    var y = e.pageY - 165;
    for(let i = 0; i < size; i++){

        for(let j = 0; j < size; j++){

            if(i * cellSize < x && x < i * cellSize + cellSize && j * cellSize < y && y < j * cellSize + cellSize){
                if(arr[i][j] == 0){

                    attribute = "add";
                    arr[i][j] = 1;
                    colorCell(i , j, "black");

                    if(i == startx && j == starty){
                        hasStart = false;
                        startx = -1;
                        starty = -1;
                    }
                    else if(i == endx && j == endy){
                        hasEnd == false;
                        endx = -1;
                        endy = -1;
                    }
                    return
                }
                else{
                    attribute = "remove";
                    arr[i][j] = 0; 
                    colorCell(i, j ,"white");
                    return;
                }
            }
        }
    }
}

function endPos(){
    painting = false;
}

function wallClick(e){

    if (!painting){
        return
    }
    var x = e.pageX - 100;
    var y = e.pageY - 165;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){

            if(i * cellSize < x && x < i * cellSize + cellSize &&
                j * cellSize < y && y < j * cellSize + cellSize){

                if(attribute == "add" && arr[i][j] == 0){
                    arr[i][j] = 1;
                    colorCell(i, j, "black")
                
                    if(i == startx && j == starty){
                        hasStart = false;
                        startx = -1;
                        starty = -1;
                    }
                    else if(i == endx && j == endy ){
                        hasEnd = false;
                        endx = -1; 
                        endy = -1;
                    }
                }
                else if(attribute == "remove" && arr[i][j] == 1){
                    arr[i][j] = 0;
                    colorCell(i, j, "white");
                }
                return;
            }
        }
    }
}

function startClick(e){

    var x = e.pageX - 100;
    var y = e.pageY - 165;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i * cellSize < x && x < i * cellSize + cellSize && j * cellSize < y && y < j * cellSize + cellSize) {

                if (!hasStart && (startx != i && starty != j)) {
                    arr[i][j] = 0;
                    hasStart = true;
                    startx = i;
                    starty = j;
                    colorCell(startx, starty, "green");
                }

                else if (hasStart && (startx != i || starty != j)) {
                    cleanPath();
                    colorCell(startx, starty, "white");
                    arr[i][j] = 0;
                    startx = i;
                    starty = j;
                    colorCell(i, j, "green");
                }
                else {
                    hasStart = false;
                    colorCell(i, j, "white");
                    startx = -1;
                    starty = -1;
                    cleanPath();
                }
                if(endx == i && endy == j) {
                    hasEnd = false;
                    endx = -1;
                    endy = -1;
                }
                break;
            }
        }
    }

    if (hasStart == true && hasEnd == true) {
        const button = document.getElementById("findPath");
        button.disabled = false;
    }

    else {
        const button = document.getElementById("findPath");
        button.disabled = true;
    }
}

function endClick(e){
    var x = e.pageX - 100;
    var y = e.pageY - 165;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i * cellSize < x && x < i * cellSize + cellSize && j * cellSize < y && y < j * cellSize + cellSize) {

                if (!hasEnd && (endx != i && endy != j)) {
                    arr[i][j] = 0;
                    hasEnd = true;
                    endx = i;
                    endy = j;
                    colorCell(i, j, "red");
                }

                else if (hasEnd && (endx != i || endy != j)) {
                    cleanPath();
                    colorCell(endx, endy, "white");
                    arr[i][j] = 0;
                    endx = i;
                    endy = j;
                    colorCell(i, j, "red");
                }
                else {
                    hasEnd = false;
                    arr[i][j] = 0;
                    colorCell(i, j, "white");
                    endx = -1;
                    endy = -1;
                    cleanPath();
                }
                if(startx == i && starty == j) {
                    hasStart = false;
                    startx = -1;
                    starty = -1;
                }
                break;
            }
        }
    }
    if (hasStart == true && hasEnd == true) {
        const button = document.getElementById("findPath");
        button.disabled = false;
    }

    else {
        const button = document.getElementById("findPath");
        button.disabled = true;
    }
}

function cleanWalls(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(arr[i][j] == 1 &&(i != startx || j != starty) 
            && (i != endx || j != endy)){

                arr[i][j] = 0; 
                colorCell(i, j, "white");
            }
        }
    }
}
function startHover(e){
    var x = e.pageX - 100;
    var y = e.pageY - 165;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i * cellSize < x && x < i * cellSize + cellSize && j * cellSize < y && y < j * cellSize + cellSize) {
                colorCell(i, j, "rgb(148, 236, 175)");
            }
            else if (arr[i][j] == 0){
                colorCell(i, j, "white");
            }
            else if(arr[i][j] == 1){
                colorCell(i, j, "black");
            }
            if(startx != -1){
                colorCell(startx, starty, "green");
            }
            if(endx != -1){
                colorCell(i, j, "red")
            }
        }
    }
}

function endHover(e){
    var x = e.pageX - 100;
    var y = e.pageY - 165;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (i * cellSize < x && x < i * cellSize + cellSize && j * cellSize < y && y < j * cellSize + cellSize) {
                colorCell(i, j, "rgb(236, 148, 148)");
            }
            else if (arr[i][j] == 0){
                colorCell(i, j, "white");
            }
            else if(arr[i][j] == 1){
                colorCell(i, j, "black");
            }
            if(startx != -1){
                colorCell(startx, starty, "green");
            }
            if(endx != -1){
                colorCell(endx, endy, "red")
            }
        }
    }
}

function cleanHovers(){

    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){

            if (arr[i][j] == 0 ){
                colorCell(i, j, "white")
            }
            if(arr[i][j] == 1){
                colorCell(i, j, "black");
            }
        }
    }
    if(startx != -1){
        colorCell(startx, starty, "green");
    }
    if(endx != -1){
        colorCell(endx, endy, "red")
    }
}
function findPath(){
    canvas.removeEventListener("click", wallClick);
    canvas.removeEventListener("click", startClick);
    canvas.removeEventListener("click", endClick);
    canvas.removeEventListener('mousemove', startHover);
    canvas.removeEventListener('mousemove', endHover)
    cleanHovers();
    cleanPath();
    time = 0; 
    var start={
        x: startx, y:starty
    }
    var finish= {
        x:endx, y:endy
    }
    aStarAlgo(arr,start, finish)
}