const e = require('./error').error
const fs = require('fs')
const path = require('path')

function checkFile(file) {
	if (file && !fs.existsSync(path.join(__dirname, file))) {
		e("Input and/or Output file not found", 404)
	}

	return file
}

exports.checkInputFile = (arr) => {
	let inputFile = 0
	for (let i = 0; i < arr.length; i++) {	
		if ((arr[i] == "-i" || arr[i] == "--input") && !inputFile) {
			inputFile = arr[i + 1]
		} else if ((arr[i] == "-i" || arr[i] == "--input") && inputFile) {
			e("Input file dublicated", 2)
		}
	}
	
	return checkFile(inputFile)
}

exports.checkOutputFile = (arr) => {
	let outputFile = 0
	for (let i = 0; i < arr.length; i++) {	
		if ((arr[i] == "-o" || arr[i] == "--output") && !outputFile) {
			outputFile = arr[i + 1]
		} else if ((arr[i] == "-o" || arr[i] == "--output") && outputFile) {
			e("Output file dublicated", 2)
		}
	}

	return checkFile(outputFile)
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