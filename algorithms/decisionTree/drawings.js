function drawLabel(start, end, dep, labelText, subattributes) {

    ctx.fillStyle = "white";                                        

    ctx.beginPath();
    ctx.rect(((start + end) / 2) - (width / 2), dep, width, height);
    ctx.fill();

    ctx.font = (height / 2) + "px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.fillText(labelText, ((start + end) / 2), dep + (height / 2), width);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.7;

    for (let i = 0; i < subattributes.length; i++) {

        var tmpStart = start + ((end - start) / subattributes.length) * i;
        var tmpEnd = tmpStart + ((end - start) / subattributes.length);

        ctx.beginPath();
        ctx.moveTo(((start + end) / 2), dep + height);
        ctx.lineTo(((tmpStart + tmpEnd) / 2), dep + (height * 3));
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = "white";
        var newStart = (((start + end) / 2) + (((tmpStart + tmpEnd) / 2))) / 2;                 
        ctx.rect(newStart - (width / 8), dep + (2 * height) - (height / 8), width / 4, height / 4);
        ctx.fill();

        ctx.fillStyle = "#000000";
        ctx.font = (height / 3) + "px Georgia";
        ctx.fillText(subattributes[i], newStart, dep + (2 * height), width / 3);
    }
}

function drawDecision(start, end, dep, text, childrenLength, index) {

    var tmpStart = start + ((end - start) / childrenLength) * index;
    var tmpEnd = tmpStart + ((end - start) / childrenLength);

    ctx.beginPath();
    ctx.arc(((tmpStart + tmpEnd) / 2), dep + (7 * height / 2), height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.fillText(text, ((tmpStart + tmpEnd) / 2), dep + (7 * height / 2), height / 2);
    ctx.closePath();
}

function colorLabel(root, index){
    start = root.start;
    end = root.end;
    dep  = root.dep;
    labelText = root.value;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(((start + end) / 2) - (width / 2), dep, width, height);
    ctx.fill();
    ctx.fillStyle = "rgba(253, 255, 150, 0.72)";                                        

    ctx.beginPath();
    ctx.rect(((start + end) / 2) - (width / 2), dep, width, height);
    ctx.fill();

    ctx.font = (height / 2) + "px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.fillText(labelText, ((start + end) / 2), dep + (height / 2), width);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.7;

    var tmpStart = start + ((end - start) / root.subattributes.length) * index;
    var tmpEnd = tmpStart + ((end - start) / root.subattributes.length);

    ctx.beginPath();
    ctx.moveTo(((start + end) / 2), dep + height);
    
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "rgba(253, 255, 150, 0.72)";
    var newStart = (((start + end) / 2) + (((tmpStart + tmpEnd) / 2))) / 2;                 
    ctx.rect(newStart - (width / 8), dep + (2 * height) - (height / 8), width / 4, height / 4);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.font = (height / 3) + "px Georgia";
    ctx.fillText(root.subattributes[index], newStart, dep + (2 * height), width / 3);
}
function colorDecision(root, childrenLength, index) {
    
    start = root.start;
    end = root.end;
    dep  = root.dep;
    if (root.value =="yes"){text = "YES"};
    if (root.value =="no"){text = "NO"};
    
    var tmpStart = start + ((end - start) / childrenLength) * index;
    var tmpEnd = tmpStart + ((end - start) / childrenLength);

    ctx.beginPath();
    ctx.arc(((tmpStart + tmpEnd) / 2), dep + (7 * height / 2), height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(((tmpStart + tmpEnd) / 2), dep + (7 * height / 2), height / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(152, 255, 150, 0.72)";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000000";
    ctx.fillText(text, ((tmpStart + tmpEnd) / 2), dep + (7 * height / 2), height / 2);
    ctx.closePath();
}