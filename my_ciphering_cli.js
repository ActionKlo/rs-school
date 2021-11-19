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

const checkConfig = require('./optionsCheck').checkConfig
const checkInputFile = require('./optionsCheck').checkInputFile
const checkOutputFile = require('./optionsCheck').checkOutputFile

let arr = process.argv
let config = checkConfig(arr)
let inputFile = checkInputFile(arr)
let outputFile = checkOutputFile(arr)

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

console.log(ts._transform("az", "", (err)=>{console.log(err.message)}))

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
