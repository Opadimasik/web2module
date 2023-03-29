function generateTable() {
    let table = document.querySelector(".table");
    table.innerHTML = "";
    let size = document.getElementById("size").value;
    let arr = new Array(size);
    for (let i = 0; i < size; i++){

        arr[i] = new Array(size);
    }
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.style.display="flex";
        for (let j = 0; j < size; j++) {
            //arr[i][j] = document.createElement("cell");
            arr[i][j].style.width = "50px";
            arr[i][j].style.height = "50px";
            arr[i][j].style.border = "1px solid black";
            arr[i][j].style.background = "rgb(255, 255, 255)";
            row.appendChild(arr[i][j]);
        }
        table.appendChild(row);
    }
}
