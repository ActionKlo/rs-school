const cesar = require('./cesar')
const atbash = require('./atbash')

exports.start = (data, configArr) => {
	for (let i = 0; i < configArr.length; i++) {
		if (configArr[i][0] == "C" || configArr[i][0] == "R") {
			let s = configArr[i][0] == "C" ? 1 : 8
			if (configArr[i][1] == "1") {
				data = cesar.encoding(data, s)
			} else {
				data = cesar.decoding(data, s)
			}
		} else {
			data = atbash.encoding(data)
		}
	}

	return data
}