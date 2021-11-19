const createConfig = require('../configCheck').createConfig

describe('Test config arguments', () => {
	it('Test correct argument', () => {
		expect(createConfig("C1-R1-A")).toEqual(expect.arrayContaining(['C1', 'R1', 'A']))
	})

	it('Test incorrect argument', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error("Invalid config") })
		expect(() => {
			createConfig("C1-R2")
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Invalid config")
		mockStderr.mockRestore()
	})
})