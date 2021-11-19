const e = require('./error').error

exports.checkInputFile = (arr) => {
	console.log(arr)
	let inputFile = 0
	for (let i = 0; i < arr.length; i++) {	
		if (arr[i] == "-i" || arr[i] == "--input" && !inputFile) {
			return inputFile = arr[i + 1]
		} else if (arr[i] == "-i" || arr[i] == "--input" && inputFile) {
			e("Input file dublicated", 2)
		}
	}

	return inputFile == 0 ? e("Input file not foun", 2) : inputFile
}

exports.checkOutputFile = (arr) => {
	let outputFile = 0
	for (let i = 0; i < arr.length; i++) {	
		if (arr[i] == "-o" || arr[i] == "--output" && !outputFile) {
			outputFile = arr[i + 1]
		} else if (arr[i] == "-o" || arr[i] == "--output" && outputFile) {
			e("Output file dublicated", 2)
		}
	}

	return outputFile == 0 ? e("Output file not foun", 2) : outputFile
}

exports.checkConfig = (arr) => {
	let config = 0

	for (let i = 0; i < arr.length; i++) {
		if ((arr[i] == "-c" || arr[i] == "--config") && !config) {
			config = arr[i + 1]
		} else if ((arr[i] == "-c" || arr[i] == "--config") && config) {
			e("Config dublicated", 2)
		}
	}

	return config == 0 ? e("Config not found", 3) : config
}