var testDataSet=[
    ['day','outlook','temperature','humidity','wind','play tennis'],
    ['1','sunny','hot','high','weak','no'],
    ['2','sunny','hot','high','strong','no'],
    ['3','overcast','hot','high','weak','yes'],
    ['4','rain','mild','high','weak','yes'],
    ['5','rain','cool','normal','weak','yes'],
    ['6','rain','cool','normal','strong','no'],
    ['7','overcast','cool','normal','strong','yes'],
    ['8','sunny','mild','high','weak','no'],
    ['9','sunny','cool','normal','weak','yes'],
    ['10','rain','mild','normal','weak','yes'],
    ['11','sunny','mild','normal','strong','yes'],
    ['12','overcast','mild','high','strong','yes'],
    ['13','overcast','hot','normal','weak','yes'],
    ['14','rain','mild','high','strong','no']
];

function testing(){
    csvCells = testDataSet;
    let table = document.querySelector('table');
    let header = table.createTHead();
    let row = header.insertRow();
    for (let i = 0; i < csvCells[0].length;i++){
        let cell = row.insertCell();
        cell.innerHTML = csvCells[0][i];
    }

    let element = table.createTBody();
    for(let i = 1; i < csvCells.length; i++){
        row = element.insertRow();

        for(let j = 0; j < csvCells[0].length; j++){
            let cell = row.insertCell();
            cell.innerHTML = csvCells[i][j];
        }
    }
}