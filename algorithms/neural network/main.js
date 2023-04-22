function recognize() {
	let imageData = context.getImageData(0, 0, 500, 500);
	grayscaleImg = imageToGrayscale(imageData);
	let boundingRectangle = getBoundaries(grayscaleImg, 0.01);
	let translatePosition = centerImage(grayscaleImg);
	let canvasCopy = document.createElement("canvas");
	canvasCopy.width = imageData.width;
	canvasCopy.height = imageData.height;
	let copiedContext = canvasCopy.getContext("2d");
	let boundariesWidth = boundingRectangle.maxX + 1 - boundingRectangle.minX;
	let boundariesHeight = boundingRectangle.maxY + 1 - boundingRectangle.minY;
	let scaling = 350 / Math.max(boundariesWidth, boundariesHeight);
	copiedContext.translate(canvas.width / 2, canvas.height / 2);
	copiedContext.scale(scaling, scaling);
	copiedContext.translate(-canvas.width / 2, -canvas.height / 2);
	copiedContext.translate(translatePosition.posX, translatePosition.posY);
	copiedContext.drawImage(context.canvas, 0, 0);
	imageData = copiedContext.getImageData(0, 0, 500, 500);
	grayscaleImg = imageToGrayscale(imageData);

	let input = createInput(grayscaleImg);

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(copiedContext.canvas, 0, 0);

	for (let y = 0; y < 28; y++) {
			for (let x = 0; x < 28; x++) {
					let pixel = context.getImageData(x * 18, y * 18, 18, 18);
					let value = 255 * (0.5 - input[x * 28 + y] / 2);
					for (let i = 0; i < 4 * 18 * 18; i += 4) {
							pixel.data[i] = value;
							pixel.data[i + 1] = value;
							pixel.data[i + 2] = value;
							pixel.data[i + 3] = 255;
					}
					context.putImageData(pixel, x * 18, y * 18);
			}
	}

	let answer = 0;
	let nnOutput = neuralNetworkProcessing(input);

	nnOutput.reduce(function (p, c, i) {
			if (p < c) {
					answer = i;
					return c;
			}
			else {
					return p;
			}
	});

	document.getElementById("answer").innerHTML = answer;
}