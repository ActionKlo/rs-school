exports.encoding = (str, s) => {
	let newStr = ""
	str = str.toString()
	
	for (let i = 0; i < str.length; i++) {
		let pos = parseInt(str[i].charCodeAt(0).toString(10))
		if ((pos >= 97 && pos <= 122) || pos >= 65 && pos <= 90) {
			if ((pos >= 97 && pos + s > 122) || (pos <= 90 && pos + s > 90)) {
				pos = pos - 26 
				newStr += String.fromCharCode(pos + s)
				continue
			}
			newStr += String.fromCharCode(pos + s)
		} else {
			newStr += str[i]
		}
	}

	return newStr
}

exports.decoding = (str, s) => {
	let newStr = ""
	str = str.toString()
	
	for (let i = 0; i < str.length; i++) {
		let pos = parseInt(str[i].charCodeAt(0).toString(10))
		if ((pos >= 97 && pos <= 122) || pos >= 65 && pos <= 90) {
			if ((pos >= 97 && pos - s < 97) || (pos <= 90 && pos - s < 65)) {
				pos = pos + 26
				newStr += String.fromCharCode(pos - s)
				continue
			}
			newStr += String.fromCharCode(pos - s)
		} else {
			newStr += str[i]
		}
	}
	
	return newStr
}