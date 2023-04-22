function getBoundaries(image, edge) {
	let rows = image.length;
	let columns = image[0].length;
	let minX = columns;
	let minY = rows;
	let maxX = -1;
	let maxY = -1;
	for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
					if (image[y][x] < edge) {
							if (minX > x) minX = x;
							if (maxX < x) maxX = x;
							if (minY > y) minY = y;
							if (maxY < y) maxY = y;
					}
			}
	}
	return {
			minY: minY,
			minX: minX,
			maxY: maxY,
			maxX: maxX
	};
}

function centerImage(image) {
	let middleX = 0;
	let middleY = 0;
	let rows = image.length;
	let columns = image[0].length;
	let sumPixels = 0;
	for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
					let pixel = (1 - image[y][x]);
					sumPixels += pixel;
					middleY += y * pixel;
					middleX += x * pixel;
			}
	}
	middleX /= sumPixels;
	middleY /= sumPixels;
	let coordinateY = Math.round(rows / 2 - middleY);
	let coordinateX = Math.round(columns / 2 - middleX);
	return {
			newMiddleX: coordinateX,
			newMiddleY: coordinateY
	};
}

function imageToGrayscale(imageMatrix) {
	let grayscale = [];
	for (let y = 0; y < imageMatrix.height; y++) {
			grayscale[y] = [];
			for (let x = 0; x < imageMatrix.width; x++) {
					let offset = y * 4 * imageMatrix.width + 4 * x;
					let alpha = imageMatrix.data[offset + 3];
					if (alpha == 0) {
							imageMatrix.data[offset] = 255;
							imageMatrix.data[offset + 1] = 255;
							imageMatrix.data[offset + 2] = 255;
					}
					imageMatrix.data[offset + 3] = 255;
					grayscale[y][x] = imageMatrix.data[y * 4 * imageMatrix.width + x * 4 + 0] / 255;
			}
	}
	return grayscale;
}