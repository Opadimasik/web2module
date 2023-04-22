var csvCells = [];
var rows = 0; 
var headerAdded = false;
var columns;

function addHeader(){
    let cells = document.getElementById("csv").value.split(",");
    csvCells[rows] = new Array(cells.length);
    columns = cells.length;
    for(let i = 0; i < cells.length; i++){
        csvCells[rows][i] = cells[i];
    }
    
    let table = document.querySelector('table');
    let header = table.createTHead();
    let row = header.insertRow();

    for(let i = 0; i < cells.length; i++){
        let cell = row.insertCell();
        cell.innerHTML = cells[i];
    }
}

function addElement(){
    let cells = document.getElementById('csv').value.split(",");
    let table = document.querySelector('table');
    let tableBody = table.createTBody();
    let row = tableBody.insertRow();
    rows++;

    csvCells[rows] = new Array(columns);
    for(let i = 0; i < cells.length; i++){
        let cell = row.insertCell();
        cell.innerHTML = cells[i];
        csvCells[rows][i] = cells[i];
    }

}

function add(){
    if(!headerAdded){
        addHeader();
        headerAdded = true;
        document.getElementById("control-button").innerHTML = "Добавить элемент";
    }
    else{
        addElement();
    }
    document.getElementById("csv").value = "";
}

function findSolution(thisRoot, find){
    for(let i = 0; i < find.length; i++){

        for(let j =  0; j < thisRoot.subattributes.length; j++){
            
                if (find[i] == thisRoot.subattributes[j]){
                    colorLabel(thisRoot, j);
                    if(thisRoot.children[j].value == "yes" || thisRoot.children[j].value=="no"){
                        colorDecision(thisRoot.children[j], thisRoot.children.length,j);
                        break;
                    }else{
                        findSolution(thisRoot.children[j], find);
                        break;
                    }
                }
            
        }
    }
}

function findDecision(){

    var find = document.getElementById("csv-find-decision").value.split(",");
    generateTree();
    let thisRoot = root;
    findSolution(thisRoot, find);

}
function clearDecision(){
    generateTree();
    document.getElementById("csv-find-decision").value = "";
}
function clearAll(){
    document.getElementById("csv-find-decision").value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("table").innerHTML = "";
    document.getElementById('csv').innerHTML = "";
    csvCells = [];
    rows = 0;
    headerAdded = false;
}
