exports.encoding = (str) => {
	let newStr = ""

	for (let i = 0; i < str.length; i++) {
		let pos = parseInt(str[i].charCodeAt(0).toString(10))
		if (pos >= 65 && pos <= 90) {
			newStr += String.fromCharCode(90 - pos + 65)
		} else if (pos >= 97 && pos <= 122) {
			newStr += String.fromCharCode(122 - pos + 97)
		} else {
			newStr += str[i]
		}
	}
	return newStr
}