exports.error = (msg, code) => {
	process.stderr.write(msg)
	process.exit(code)
}