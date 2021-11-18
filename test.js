const atbashEncoding = require('./atbash').encoding
const cesarEncoding = require('./cesar').encoding
const cesarDecoding = require('./cesar').decoding

test('atbush encoding', () => {
	expect(atbashEncoding("A")).toBe("Z")
	expect(atbashEncoding("a")).toBe("z")
	expect(atbashEncoding("1")).toBe("1")
	expect(atbashEncoding("!")).toBe("!")
})

test('cesar encoding', () => {
	expect(cesarEncoding("Z", 1)).toBe("A")
	expect(cesarEncoding("Z1", 1)).toBe("A1")
	expect(cesarEncoding("a", 1)).toBe("b")
})

test('cesar decoding', () => {
	expect(cesarDecoding("A", 1)).toBe("Z")
	expect(cesarDecoding("a1", 1)).toBe("z1")
	expect(cesarDecoding("b", 1)).toBe("a")
})
//['-c', 'C1', '-i', './input.txt', '-o', './output.txt']