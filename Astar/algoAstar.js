class Queue {
  constructor() {
    var a = [];
    var b = 0;

    this.enqueue = function (b) {
      a.push(b);
      a.sort(function (a, b) {
        if (a.f > b.f)
          return 1;
        if (a.f < b.f)
          return -1;
        return 0;
      });
    };
    this.dequeue = function () {
      return a.shift();
    };
    this.isEmpty = function () {
      return a.length == 0;
    };
    this.getLength = function () {
      return a.length - b;
    };
  }
}
function Cell(){
    this.f;
    this.g;
    this.h;
    this.parentx;
    this.parenty;
}
class triple {
  constructor(f, x, y) {
    this.x = x;
    this.y = y;
    this.f = f;
  }
}
function isValid(x, y){
    if(x >= 0 && x < size && y >= 0 && y < size) return true;
    else return false;
}
function isFinish(x, y, finish){
    if(x == finish.x && y == finish.y) return true;
    else return false;
}
function calculateDistance(x, y, finish){
    return Math.sqrt(Math.pow(x - finish.x, 2) + Math.pow(y - finish.y, 2));

}
function aStarAlgo(array, start, finish){

    let visited = new Array(size);
    let cells = new Array(size);
    for(let i = 0; i < size; i++){
        visited[i] = new Array(size);
        cells[i] = new Array (size); 
        for(let j = 0; j < size; j++){
            visited[i][j] = false;
            cells[i][j] = new Cell;
        } 
    }
    let currentI = start.x;
    let currentJ = start.y;
    cells[currentI][currentJ].f = 0.0;
    cells[currentI][currentJ].g = 0.0;
    cells[currentI][currentJ].h = 0.0;
    cells[currentI][currentJ].parentx = currentI;
    cells[currentI][currentJ].parenty = currentJ;

    let neighboors = new Queue();
    let triplet = new triple(0.0, currentI, currentJ);
    neighboors.enqueue(triplet);
    let reachFinish = false;

    while(!neighboors.isEmpty()){
      
      let currnetCell = neighboors.dequeue();
      currentI = currnetCell.x;
      currentJ = currnetCell.y;
      visited[currentI][currentJ] = true;
      if(currentI != start.x || currentJ != start.y){
        cellsChangingAnimation(currentI, currentJ, "rgb(140, 242, 255)");
      }

      let hNew;
      let gNew;
      let fNew;
      //right
      if(isValid(currentI + 1, currentJ)){
        
        if(isFinish(currentI + 1, currentJ, finish)){
            cells[currentI + 1][currentJ].parentx = currentI;
            cells[currentI + 1][currentJ].parenty = currentJ;
            drawPath(cells, finish);
            reachFinish = true;
            return;
        }
        else if(!visited[currentI+ 1][currentJ] && array[currentI + 1][currentJ] != 1){

          gNew = cells[currentI][currentJ].g + 1;
          hNew = calculateDistance(currentI + 1, currentJ, finish);
          fNew = hNew + gNew;

          if(cells[currentI + 1][currentJ].f == undefined || cells[currentI + 1][currentJ].f > fNew){

            triplet = new triple(fNew, currentI + 1, currentJ);
            neighboors.enqueue(triplet);
            
            if(triplet.x != finish.x || triplet.y != finish.y ) cellsChangingAnimation(currentI + 1, currentJ, "rgb(240, 255, 140)");

            cells[currentI + 1][currentJ].f = fNew;
            cells[currentI + 1][currentJ].g = gNew;
            cells[currentI + 1][currentJ].h = hNew;
            cells[currentI + 1][currentJ].parentx = currentI;
            cells[currentI + 1][currentJ].parenty = currentJ;
          }
        }
      }
      //left
      if(isValid(currentI - 1, currentJ)){

        if(isFinish(currentI - 1, currentJ, finish)){
            cells[currentI - 1][currentJ].parentx = currentI;
            cells[currentI - 1][currentJ].parenty = currentJ;
            drawPath(cells, finish);
            reachFinish = true;
            return;
        }
        else if(!visited[currentI -1][currentJ] && array[currentI - 1][currentJ] != 1){

          gNew = cells[currentI][currentJ].g + 1;
          hNew = calculateDistance(currentI - 1, currentJ, finish);
          fNew = hNew + gNew;

          if(cells[currentI - 1][currentJ].f == undefined || cells[currentI - 1][currentJ].f > fNew){

            triplet = new triple(fNew, currentI - 1, currentJ);
            neighboors.enqueue(triplet);
            
            if(triplet.x != finish.x || triplet.y != finish.y ) cellsChangingAnimation(currentI - 1, currentJ, "rgb(240, 255, 140)");

            cells[currentI - 1][currentJ].f = fNew;
            cells[currentI - 1][currentJ].g = gNew;
            cells[currentI - 1][currentJ].h = hNew;
            cells[currentI - 1][currentJ].parentx = currentI;
            cells[currentI - 1][currentJ].parenty = currentJ;
          }
        }
      }
      //down
      if(isValid(currentI, currentJ + 1)){
       
        if(isFinish(currentI, currentJ + 1, finish)){
            cells[currentI][currentJ + 1].parentx = currentI;
            cells[currentI][currentJ + 1].parenty = currentJ;
            drawPath(cells, finish);
            reachFinish = true;
            return;
        }
        else if(!visited[currentI][currentJ + 1] && array[currentI][currentJ + 1] != 1){

          gNew = cells[currentI][currentJ].g + 1;
          hNew = calculateDistance(currentI, currentJ + 1, finish);
          fNew = hNew + gNew;

          if(cells[currentI][currentJ + 1].f == undefined || cells[currentI][currentJ + 1].f > fNew){

            triplet = new triple(fNew, currentI, currentJ + 1);
            neighboors.enqueue(triplet);
            
            if(triplet.x != finish.x || triplet.y != finish.y ) cellsChangingAnimation(currentI, currentJ + 1, "rgb(240, 255, 140)");

            cells[currentI][currentJ + 1].f = fNew;
            cells[currentI][currentJ + 1].g = gNew;
            cells[currentI][currentJ + 1].h = hNew;
            cells[currentI][currentJ + 1].parentx = currentI;
            cells[currentI][currentJ + 1].parenty = currentJ;
          } 
        }
      }
      //up
      if(isValid(currentI, currentJ - 1)){
        
        if(isFinish(currentI, currentJ - 1, finish)){
            cells[currentI][currentJ - 1].parentx = currentI;
            cells[currentI][currentJ - 1].parenty = currentJ;
            drawPath(cells, finish);
            reachFinish = true;
            return;
        }
        else if(!visited[currentI][currentJ -1] && array[currentI][currentJ - 1] != 1){

          gNew = cells[currentI][currentJ].g + 1;
          hNew = calculateDistance(currentI, currentJ - 1, finish);
          fNew = hNew + gNew;

          if(cells[currentI][currentJ - 1].f == undefined || cells[currentI][currentJ - 1].f > fNew){

            triplet = new triple(fNew, currentI, currentJ - 1);
            neighboors.enqueue(triplet);
            
            if(triplet.x != finish.x ||triplet.y != finish.y ) cellsChangingAnimation(currentI, currentJ - 1, "rgb(240, 255, 140)");

            cells[currentI][currentJ - 1].f = fNew;
            cells[currentI][currentJ - 1].g = gNew;
            cells[currentI][currentJ - 1].h = hNew;
            cells[currentI][currentJ - 1].parentx = currentI;
            cells[currentI][currentJ - 1].parenty = currentJ;
          }
        }
      }
    }
    if(!reachFinish){
      k++;
      timeoutID[k] = setTimeout(function(){
        let button = document.getElementById("cleanPath");
        button.disabled = true;
      }, time);

      
    }
    return;
}