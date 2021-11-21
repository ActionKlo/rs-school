const encode = require('../encode').start

describe('Test encode', () => {
	it('Test normal string', () => {
		expect(encode("This is secret", ['C1', 'C1', 'R0', 'A']))
			.toBe("Myxn xn nbdobm")
	})

	it('Test string with special characters', () => {
		expect(encode("Message about '_' symbol!", ['C1', 'C0', 'A', 'R1', 'R0', 'A', 'R0', 'R0', 'C1', 'A']))
			.toBe("Ckwwoik onauv '_' wqcnad!")
	});

	it('Test string with numbers', () => {
		expect(encode("123", ['C1'])).toBe("123")
	});
})