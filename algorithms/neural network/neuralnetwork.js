function neuralNetworkProcessing(data) {
	let hiddenLayerOutput = [];
	console.log(weightsInputToHidden.length)
	for (let i = 0; i < weightsInputToHidden.length; i++) {
			hiddenLayerOutput[i] = hiddenBias[i];
			for (let j = 0; j < weightsInputToHidden[i].length; j++) {
					hiddenLayerOutput[i] += data[j] * weightsInputToHidden[i][j];
			}
			hiddenLayerOutput[i] = 1 / (1 + Math.exp(-hiddenLayerOutput[i]));
	}

	let outputLayerOutput = [];
	for (let i = 0; i < weightsHiddenToOutput.length; i++) {
			outputLayerOutput[i] = outputBias[i];
			for (let j = 0; j < weightsHiddenToOutput[i].length; j++) {
					outputLayerOutput[i] += hiddenLayerOutput[j] * weightsHiddenToOutput[i][j];
			}
	}

	let max3 = outputLayerOutput.reduce(function (p, c) {
			return Math.max(p, c);
	});
	let numerators = outputLayerOutput.map(function (e) {
			return Math.exp(e - max3);
	});
	let denumerators = numerators.reduce(function (p, c) {
			return p + c;
	});
	let output = numerators.map(function (e) {
			return e / denumerators;
	});

	return output;
}

function createInput(grayscale) {
	let matrix = new Array(28*28);

	for (let y = 0; y < 28; y++) {
			for (let x = 0; x < 28; x++) {
					let middleValue = 0;
					for (let i = 0; i < 18; i++) {
							for (let j = 0; j < 18; j++) {
									if (y * 18 + i <= 499 && x * 18 + j <= 499) {
											middleValue += grayscale[y * 18 + i][x * 18 + j];
									}
									else {
											middleValue += grayscale[Math.min(499, y * 18 + i)][Math.min(499, x * 18 + j)];
									}
							}
					}
					middleValue = (1 - middleValue / 400);
					matrix[x * 28 + y] = (middleValue - 0.5) / 0.5;
			}
	}
	return matrix
}