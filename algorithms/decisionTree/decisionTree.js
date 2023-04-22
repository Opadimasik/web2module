var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth * 0.85;
canvas.height = window.innerHeight * 0.7;
var ctx = canvas.getContext("2d");
var height, width;
var subattributes, attributes, vis;
var tmp =[], vec = [], current =[];

class Node{
    constructor(value, start, end, dep){
        this.value = value;
        this.start = start;
        this.end = end;
        this.dep = dep;
        this.subattributes = [];
        this.children = [];

        this.appendChild = function(node){
            this.children.push(node);
        }
    }
}
var root = new Node();
function entropy(positive, negative){
    let summ = positive + negative;
    if(positive == 0 || negative == 0){
        return 0; 
    }
    return -(positive / summ) *Math.log2(positive/summ)-
    (negative / summ) * Math.log2(negative / summ);
}   

function initalizeAtributes(){
    subattributes = new Array(csvCells[1].length);
    attributes = new Array(csvCells[1].length);

    for(let i = 1; i < subattributes.length; i++){
        subattributes[i] = [];
        attributes[i] = csvCells[0][i];
        for(let j = 1; j < csvCells.length;j++){
            let alreadyIn = false;
            for(let k = 0; k < subattributes[i].length; k++){
                if(csvCells[j][i] == subattributes[i][k]){
                    alreadyIn = true;
                    break;
                }
            }
            if(!alreadyIn){
                subattributes[i].push(csvCells[j][i]);
            }
        }
    }
    height = (canvas.height *0.96) /(subattributes.length - 1 +((subattributes.length - 2) * 2));
    
    width = height * 3;

}
 
function informationGain(current,k){
    var res = 0;
    for (let i = 0; i < subattributes[k].length; i++) {
        var c1 = 0, c2 = 0, total = current[k].length;
        var sub = subattributes[k][i];
        for (let j = 1; j < current[k].length; j++) {
            if (current[k][j] === sub) {
                c1++;
                if (current[current.length - 1][j] == "no" ||current[current.length - 1][j] =="нет" ) {
                    c2++;
                }
            }
        }

        res += (c1 / total) * entropy(c1 - c2, c2)
    }

    return res;
}

function build(current, tmp, k, s) {

    for (let i = 1; i < current.length; i++) {
        tmp[i] = [];
    }

    for (let i = 1; i < current[k].length; i++) {

        if (current[k][i] === s) {

            for (let j = 1; j < current.length; j++) {
                tmp[j].push(current[j][i]);
            }
        }
    }
}

function judge(tmp, u, s) {
    var positive = 0, negative = 0, total = 0;
    for (let i = 1; i < tmp[u].length; i++) {
        if (tmp[u][i] == s) {
            total++;
            if (tmp[tmp.length - 1][i] == "yes" || tmp[tmp.length - 1][i] == "да") {
                positive++
            }
            else {
                negative++;
            }
        }
    }

    if (positive == total) {
        return 1;
    }
    else if (negative == total) {
        return 0;
    }
    else {
        return -1;
    }
}

function ID3(u, dep, current, tmp, start, end, node) {

    drawLabel(start, end, dep, attributes[u], subattributes[u]);

    for (let i = 0; i < subattributes[u].length; i++) {
        build(current, tmp, u, subattributes[u][i]);                 
        var flag = judge(tmp, u, subattributes[u][i]);           

        if (flag != -1) {
            if (flag == 1) {
                let newNode = new Node("yes", start, end, dep);
                node.appendChild(newNode);
                drawDecision(start, end, dep, "YES", subattributes[u].length, i);

            }
            else {
                let newNode = new Node("no", start, end, dep);
                node.appendChild(newNode);
                drawDecision(start, end, dep, "NO", subattributes[u].length, i);
            }

            continue;
        }

        var ans;
        var mi = Infinity;
        for (let j = 1; j < current.length - 1; j++) {
            if (vis[j] == 1) {
                continue;
            }

            var c = informationGain(tmp, j);
            if (c < mi) {
                mi = c;
                ans = j;
            }
        }
        vis[ans] = 1;

        var tmpStart = start + ((end - start) / subattributes[u].length) * i;
        var tmpEnd = tmpStart + ((end - start) / subattributes[u].length); 
        var child = new Node(attributes[ans],tmpStart, tmpEnd,dep + (height * 3));
        child.subattributes = subattributes[ans];
        node.appendChild(child); 
        ID3(ans, dep + (height * 3), tmp, vec, tmpStart, tmpEnd, child);
        vis[ans] = 0;
    }
}

function generateTree(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initalizeAtributes();

    for (let i = 1; i < csvCells[1].length; i++) {
        current[i] = [];
        for (let j = 1; j < csvCells.length; j++) {
            current[i][j] = csvCells[j][i];
        }
    }


    for (let i = 1; i < csvCells[1].length; i++) {
        tmp[i] = [];
        for (let j = 1; j < csvCells.length; j++) {
            tmp[i][j] = csvCells[j][i];
        }
    }

    var ans;
    var mi = Infinity;
    for (let i = 1; i < current.length - 1; i++) {
        var c = informationGain(tmp, i);

        if (c < mi) {
            mi = c;
            ans = i;
        }
    }

    vis = new Array(current.length);
    vis[ans] = 1;
    root = new Node(attributes[ans], 0, canvas.width, 0.02 * height)
    root.subattributes = subattributes[ans];
    ID3(ans, 0.02 * height, current, tmp, 0, canvas.width, root);
}