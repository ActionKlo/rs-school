const process = require('process')
const path = require('path')
const fs = require('fs')
// const Transform = require('stream').Transform
var stream = require('stream')
var Transform = stream.Transform ||
  require('readable-stream').Transform;

const cesar = require('./cesar')
const atbash = require('./atbash')
const configCheck = require('./configCheck')
const e = require('./error').error
const encode = require('./encode')

const input = process.stdin
const output = process.stdout

let arr = process.argv, inputFile = 0, outputFile = 0, config = 0

for (let i = 0; i < arr.length; i++) {

	if (arr[i] == "-c" || arr[i] == "--config" && !config) {
		config = arr[i + 1]
	} else if (arr[i] == "-c" || arr[i] == "--config" && config) {
		e("Config dublicated", 2)
	}

	if (arr[i] == "-i" || arr[i] == "--input" && !inputFile) {
		inputFile = arr[i + 1]
	} else if (arr[i] == "-i" || arr[i] == "--input" && inputFile) {
		e("Input file dublicated")
	}

	if (arr[i] == "-o" || arr[i] == "--output" && !outputFile) {
		outputFile = arr[i + 1]
	} else if (arr[i] == "-o" || arr[i] == "--output" && outputFile) {
		e("Output file dublicated")
	}
}

if (!config) {
	e("Config not found", 404)
}

if ((inputFile && !fs.existsSync(path.join(__dirname, inputFile))) || (outputFile && !fs.existsSync(path.join(__dirname, outputFile)))) {
	e("Input and/or Output file not found", 404)
}

let configArr = []
if(!configCheck.createConfig(config)) {
	e("Invalid config", 2)
}

configArr = configCheck.createConfig(config)

const ws = outputFile ? fs.createWriteStream(outputFile, {flags: 'a'}) : process.stdin
const rs = inputFile ? fs.createReadStream(inputFile) : process.stdout

const ts = new Transform({
	transform(chunk, encodind, callback) {
		this.push(encode.start(chunk.toString(), configArr))
	}
})

rs
	.on('error', (error) => {
		e(error, 2)
	})
	.pipe(ts)
		.on('error', (error) => {
			e(error, 3)
		})
	.pipe(ws) // process.stdout
		.on('error', (error) => {
			e(error, 4)
		})
