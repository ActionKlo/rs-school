const process = require('process')
const path = require('path')
const fs = require('fs')

const cesar = require('./cesar')
const atbash = require('./atbash')
const configCheck = require('./configCheck')
const e = require('./error')
const encode = require('./encode')

const input = process.stdin
const output = process.stdout

let arr = process.argv, inputFile = 0, outputFile = 0, config = 0

for (let i = 0; i < arr.length; i++) {

	if (arr[i] == "-c" || arr[i] == "--config" && !config) {
		config = arr[i + 1]
	} else if (arr[i] == "-c" || arr[i] == "--config" && config) {
		e.error("Config dublicated", 2)
	}

	if (arr[i] == "-i" || arr[i] == "--input" && !inputFile) {
		inputFile = arr[i + 1]
	} else if (arr[i] == "-i" || arr[i] == "--input" && inputFile) {
		e.error("Input file dublicated")
	}

	if (arr[i] == "-o" || arr[i] == "--output" && !outputFile) {
		outputFile = arr[i + 1]
	} else if (arr[i] == "-o" || arr[i] == "--output" && outputFile) {
		e.error("Output file dublicated")
	}
}

if (!config) {
	e.error("Config not found", 404)
}

if ((inputFile && !fs.existsSync(path.join(__dirname, inputFile))) || (outputFile && !fs.existsSync(path.join(__dirname, outputFile)))) {
	e.error("Input and/or Output file not found", 404)
}

let configArr = []
if(!configCheck.createConfig(config)) {
	e.error("Invalid config", 2)
}

configArr = configCheck.createConfig(config)

let ws = fs.createWriteStream(outputFile, {flags: 'a'})
if (!inputFile) {

	input.on('data', data => {
		data = encode.start(data, configArr)

		if (!outputFile) {
			output.write(data)
		} else {

			ws.pipe(data)
		}
	})
} else {
	let rs = fs.createReadStream(inputFile)
	
	rs.on('data', (chunk) => {
		chunk = encode.start(chunk.toString(), configArr)
		
		if (!outputFile) {
			output.write(chunk)
		} else {
			// let ws = fs.createWriteStream(outputFile, {flags: 'a'})

			ws.write(chunk)
		}
	})
}

// for (let i = 0; i < configArr.length; i++) {
// 	if (configArr[i][0] == "C" || configArr[i][0] == "R") {
// 		let s = configArr[i][0] == "C" ? 1 : 8
// 		if (configArr[i][1] == "1") {
// 			asd = cesar.encoding(asd, s)
// 		} else {
// 			asd = cesar.decoding(asd, s)
// 		}
// 	} else {
// 		asd = atbash.encoding(asd)
// 	}
// }

// console.log(asd)

// if (!inputFile) {
// 	input.on('data', data => {
// 		for (let i = 0; i < configArr.length; i++) {
// 			if (configArr[i][0] == "C" || configArr[i][0] == "R") {
// 				let s = configArr[i][0] == "C" ? 1 : 8
// 				if (configArr[i][1] == "1") {
// 					data = cesar.encoding(data, s)
// 				} else {
// 					data = cesar.decoding(data, s)
// 				}
// 			} else {
// 				data = atbash.encoding(data)
// 			}
// 		}
// 		console.log(data)
// 		// data = cesar.encoding(data, 1)
// 		// data = cesar.decoding(data, 1)
// 		// data = atbash.encoding(data)

// 		// data = cesar.encoding(data, 8)
// 		// data = cesar.decoding(data, 8)
// 		// data = atbash.encoding(data)

// 		// data = cesar.decoding(data, 8)
// 		// data = cesar.decoding(data, 8)
// 		// data = cesar.encoding(data, 1)

// 		// data = atbash.encoding(data)
// 		// console.log(data)
// 		// if (!outputFile) {
// 		// 	output.write(data.toString())
// 		// }
// 	});
// }