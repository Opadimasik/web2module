var populationSize, mutationPercent, generationsNumber;
var adjacencyMatrix;

class Path {
    path = [];
    cost = 0; 
    
    constructor(array, l) {
        this.path = array;
        this.cost = l;
    }
}

function findDistance(first, second){
    let dist = Math.sqrt(Math.pow((first.x - second.x), 2) + Math.pow((first.y - second.y), 2))
    return dist;
}
function calculateFullPath(array){
    console.log(array);
    let pathCost = 0; 
    for(let i = 0; i < amountOfpoints - 1; i++){
        pathCost += adjacencyMatrix[array[i].number][array[i+1].number];
    }
    pathCost+= adjacencyMatrix[array[0].number][array[amountOfpoints - 1].number];
    return pathCost;
}
function shuffleArray(array){
    return [...array].sort(()=> Math.random() -0.5);
}

function createAdjacencyMatrix(vertexes){
    let adjacencyMatrix = new Array(amountOfpoints);
    for(let i = 0; i < amountOfpoints; i++){
        adjacencyMatrix[i] = new Array(amountOfpoints);
        for(let j = 0; j < amountOfpoints; j++){
            if(i != j){
                adjacencyMatrix[i][j] = findDistance(vertexes[i], vertexes[j]);
            }
            else{
                adjacencyMatrix[i][j] = 0;
            }
        }
    }
    return adjacencyMatrix;
}

function generateChild(firstParent, secondParent, mutationPercent, breakPoint){

    let newChild = new Path();
    newChild.path = new Array(amountOfpoints);
    let visited = new Array(amountOfpoints)
    let index = 0;
    for (let i = 0; i < amountOfpoints; i++){
        visited[i] = false;
    }

    for(let i = 0; i < breakPoint + 1; i++){
        newChild.path[index] = firstParent.path[i];
        index++;
        visited[firstParent.path[i].number] = true;
    }
    for(let i = breakPoint + 1; i < amountOfpoints; i++){
        if(!visited[secondParent.path[i].number]){
            newChild.path[index] = secondParent.path[i];
            visited[secondParent.path[i].number] = true;
            index++
        }
    }
    for(let i = breakPoint + 1; i < amountOfpoints; i++){
        if(!visited[firstParent.path[i].number]){
            newChild.path[index] = firstParent.path[i];
            visited[firstParent.path[i].number] = true;
            index++
        }
    }

    //mutation
    let mutation = Math.floor(Math.random() * 100);
    if (mutation < mutationPercent){
        let firstIndex = Math.floor(Math.random() * (amountOfpoints - 1));
        let secondIndex = Math.floor(Math.random() * (amountOfpoints - 1));
        while(firstIndex == secondIndex){
            secondIndex = Math.floor(Math.random() * (amountOfpoints - 1));
        }
        let temp = newChild.path[firstIndex];
        newChild.path[firstIndex] = newChild.path[secondIndex];
        newChild.path[secondIndex] = temp;
    }
    newChild.cost = calculateFullPath(newChild.path);
    redrawCanvas();
    drawPath(newChild.path)
    return newChild;
}

function geneticAlgo(){
    canvas.removeEventListener("click", vertexCreate);
    populationSize = document.getElementById("populationSize").value
    mutationPercent = document.getElementById("mutation").value;
    generationsNumber = document.getElementById("generations").value;
    adjacencyMatrix = createAdjacencyMatrix(vertexes);

    var population = new Array(populationSize);
    for (let i = 0; i < populationSize; i++){
        var newPopulation = shuffleArray(vertexes);
        population[i] = new Path(newPopulation, calculateFullPath(newPopulation));
    }

    for(let i = 0; i < generationsNumber; i++){
        
        let breakPoint = Math.floor(Math.random() * (amountOfpoints - 2)) + 1;
        let firstRandomindex = Math.floor(Math.random() * (populationSize - 1));
        let firstParent = population[firstRandomindex];
        let secondRandomIndex = Math.floor(Math.random() * (populationSize - 1));
        while(firstRandomindex == secondRandomIndex){
            secondRandomIndex =Math.floor(Math.random() * (populationSize - 1));
        }
        let secondParent = population[secondRandomIndex];
        population.push(generateChild(firstParent, secondParent, mutationPercent, breakPoint));
        population.push(generateChild(secondParent, firstParent, mutationPercent, breakPoint));
        population.sort(function(a, b){
            return a.cost - b.cost;
        });
        population.pop();
        population.pop();
    }
    redrawCanvas();
    drawFinalPath(population[0].path);
    clearPathButton.disabled = false;
}