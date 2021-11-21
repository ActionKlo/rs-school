const process = require('process')
const fs = require('fs')
var stream = require('stream')
var Transform = stream.Transform ||
  require('readable-stream').Transform

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

let configArr = configCheck.createConfig(config)

const ws = outputFile ? fs.createWriteStream(outputFile, {flags: 'a'}) : process.stdout
const rs = inputFile ? fs.createReadStream(inputFile) : process.stdin

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
