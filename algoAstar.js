var startCell = null;
var endCell = null;

function generateTable() {
    let table = document.querySelector(".table");
    table.innerHTML = "";
    window.size = document.getElementById("size").value;
    window.arr = new Array(size);
    for (let i = 0; i < size; i++){
      arr[i] = new Array(size);
    }
    for (let i = 0; i < size; i++) {
      let row = document.createElement("div");
      row.style.display="flex";
      for (let j = 0; j < size; j++) {
        arr[i][j] = document.createElement("div");
        arr[i][j].classList.add("cell");
        if (Math.random() < 0.3) {
          arr[i][j].classList.add("wall");
        }
        row.appendChild(arr[i][j]);
      }
      table.appendChild(row);
    }
  }

  function drawWay(path){

    for (let i = 0; i < path.length; i++){
        arr[path[i].x][path[i].y].classList.remove("start")
        arr[path[i].x][path[i].y].classList.remove("searhingStart")
        arr[path[i].x][path[i].y].classList.remove("end")
        arr[path[i].x][path[i].y].classList.remove("searchingEnd")
        arr[path[i].x][path[i].y].classList.remove("checked")
        arr[path[i].x][path[i].y].classList.add("way")
    }


} 
   function getDistance(x1, y1, x2, y2) {
      let dx = Math.abs(x1 - x2);
      let dy = Math.abs(y1 - y2);
      return Math.sqrt(dx*dx + dy*dy);
    }

    function isValid(x, y) {
      return (x >= 0 && x < size && y >= 0 && y < size && !arr[x][y].classList.contains("wall"));
    }
  function aStar() {

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr[i][j].g = Infinity; 
        arr[i][j].h = getDistance(i, j, endCell.x , endCell.y); 
        arr[i][j].f = Infinity;  
        arr[i][j].parent = null;  
        arr[i][j].x = i;
        arr[i][j].y = j;
      }
    }

    startCell.g = 0;
    startCell.f = startCell.h;

    let openSet = [startCell];
    let closedSet = [];
  
    while (openSet.length > 0) {
      let currentCell = openSet[0];
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < currentCell.f) {
          currentCell = openSet[i];
        }
      }

      if (currentCell === endCell) {
        let path = [endCell];
        let parent = endCell.parent;
        while (parent) {
          path.push(parent);
          parent = parent.parent;
        }
        path.reverse();
        drawWay(path);
      }
      openSet.splice(openSet.indexOf(currentCell), 1);
      closedSet.push(currentCell);

      let neighbors = [      [currentCell.x-1, currentCell.y],
        [currentCell.x, currentCell.y-1],
        [currentCell.x+1, currentCell.y],
        [currentCell.x, currentCell.y+1]
      ];
      for (let i = 0; i < neighbors.length; i++) {
        let neighborX = neighbors[i][0];
        let neighborY = neighbors[i][1];
        if (!isValid(neighborX, neighborY) || closedSet.includes(arr[neighborX][neighborY])) {
          continue;

        }
        let neighbor = arr[neighborX][neighborY];
        let tentativeG = currentCell.g + 1;
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeG >= neighbor.g) {
          continue;
        }
        neighbor.g = tentativeG;
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.parent = currentCell;
      }
    }
  
    // нет пути
  }


function cleanCells(){

    for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if (arr[i][j] == startCell && arr[i][j].classList.contains("way")){

                arr[i][j].classList.remove("way")
                arr[i][j].classList.add("start")
            }
            if (arr[i][j] == startCell && arr[i][j].classList.contains("end")){

                arr[i][j].classList.remove("way")
                arr[i][j].classList.add("end")
            }
            if(arr[i][j].classList.contains("way")){

                arr[i][j].classList.remove("way");
            }
            if(arr[i][j].classList.contains("checked")){

                arr[i][j].classList.remove("checked");
            }
        }
    }
}

function cellClickEnd(){
    for(let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            if(arr[i][j].classList.contains('choosingStart') && arr[i][j] != startCell) {
                arr[i][j].classList.remove("choosingStart");
            }
            if(!arr[i][j].classList.contains('wall') && !arr[i][j].classList.contains("start")){
                arr[i][j].classList.add("choosingEnd")
                arr[i][j].addEventListener('click', function(){
                    if (endCell != null) {
                        endCell.classList.remove("end");
                        arr[i][j].classList.add("end")
                        endCell = arr[i][j]
                    }
                    else{
                    arr[i][j].classList.add("end");
                    endCell = arr[i][j];
                }
                });
            }
        } 
    }
}

function cellClickStart(){
    for(let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            if(arr[i][j].classList.contains('choosingEnd') && arr[i][j] != endCell) {
                arr[i][j].classList.remove("choosingEnd");
            }
            if(!arr[i][j].classList.contains('wall') && !arr[i][j].classList.contains("end")){
                arr[i][j].classList.add("choosingStart")
                arr[i][j].addEventListener('click', function(){
                    if (startCell != null) {
                        startCell.classList.remove("start");
                        arr[i][j].classList.add("start")
                        startCell= arr[i][j]
                    }else{
                    arr[i][j].classList.add("start");
                    startCell = arr[i][j];
                }
                });
            }
        }
    }
}