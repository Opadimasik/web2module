function generateMaze(){

    time = 0;
    startx = -1, starty = -1;
    endx = -1, endy = -1;
    hasEnd = false, hasStart = false;
    
    for (let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            arr[i][j] = 1;
            colorCell(i, j, "black");
        }
    }
    
    let overflow = size % 2;
    let sizeForMaze = (size - overflow) / 2;
    let cells = new Array(sizeForMaze);
    for(let i = 0; i < sizeForMaze; i++){
        cells[i] = new Array(sizeForMaze);
        for(let j = 0; j < sizeForMaze; j++){

            let cell = {
                x: i, y: j, 
                index: [i, j], 
                status:"not visited", 
                adjacents: [], 
                connections: [],
            };
            cells[i][j] = cell;
            
            if(i + 1 < 0){
                let right = cells[i + 1][j];
                cell.adjacents.push(right);
                right.adjacents.push(cell);
            }
            if(i - 1 >= 0){
                let left = cells[i - 1][j];
                cell.adjacents.push(left);
                left.adjacents.push(cell);
            }
            if(j + 1 < 0){
                let down = cells[i][j + 1];
                cell.adjacents.push(down);
                down.adjacents.push(cell);
            }
            if(j - 1 >= 0){
                let up = cells[i][j - 1];
                cell.adjacents.push(up);
                up.adjacents.push(cell);
            }
        }
    }
    
    let visited = new Set()
    let borderCells = new Set();
    let start = cells[Math.floor(Math.random() * cells.length)][Math.floor(Math.random() * cells.length)];  
    borderCells.add(start);

    let currnetCell = start;

    recursiveSpanningTree()

    function recursiveSpanningTree(){

        borderCells.delete(currnetCell);
        visited.add(currnetCell);
        currnetCell.status = "visited";
        arr[currnetCell.x * 2 + 1][currnetCell.y * 2 + 1] = 0;
        cellsChangingAnimation(currnetCell.x * 2 + 1, currnetCell.y * 2 + 1, "white");

        function addBorderCell(adjacentCell){
            for (let c of adjacentCell){

                if(c.status =="not visited"){

                    borderCells.add(c);
                    c.status = "borderCell";
                    c.connections.push(currnetCell);
                }
                else if(c.status === "borderCell"){
                    c.connections.push(currnetCell);
                }
            }
        }
        addBorderCell(currnetCell.adjacents);
        let forRandomCells = [...borderCells.values()];
        let randomIndex = Math.floor(Math.random() * forRandomCells.length);
        let randomCell = forRandomCells[randomIndex];

        if(randomCell && randomCell.x >= 0 && randomCell.x < sizeForMaze 
            &&randomCell.y >= 0 && randomCell.y < sizeForMaze ){
            let randomConnection = Math.floor(Math.random() * randomCell.connections.length);
            let randomConnectionX = randomCell.x + randomCell.connections[randomConnection].x;
            let randomConnectionY = randomCell.y + randomCell.connections[randomConnection].y;
            arr[randomConnectionX + 1][randomConnectionY + 1] = 0;
            cellsChangingAnimation(randomConnectionX + 1, randomConnectionY + 1, "white");
        }
        currnetCell = randomCell;
        if(borderCells.size > 0){
            recursiveSpanningTree();
        }
    }
}