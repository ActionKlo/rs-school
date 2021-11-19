const checkConfigOption = require('../optionsCheck').checkConfig
const checkInputOption = require('../optionsCheck').checkInputFile
const checkOutputOption = require('../optionsCheck').checkOutputFile

describe('Test config error', () => {
	it("Test normal config", () => {
		expect(checkConfigOption(['-c', "C1"])).toBe("C1")
	})

	it('Test not found config', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error("Config not found") })
		expect(() => {
			checkConfigOption([])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Config not found")
		mockStderr.mockRestore()
	})

	it('Test config error message', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error("Config dublicated") })
		expect(() => {
			checkConfigOption(['-c', "C1", '-c', "C0"])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Config dublicated")
		mockStderr.mockRestore()
	})
	
	it('Test config error code', () => {
		const mockExit = jest.spyOn(process, 'exit')
			.mockImplementation(() => { throw new Error(2) })
		expect(() => {
			checkConfigOption(['-c', "C1", '-c', "C0"])
		}).toThrow()
		expect(mockExit).toHaveBeenCalledWith(2)
		mockExit.mockRestore()
	})
})

describe('Test input error', () => {
	it('Test avaible input file', () => {
		expect(checkInputOption(['-i', './input.txt'])).toBe('./input.txt')
	})

	it('Test unavaible input file', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error ("Input and/or Output file not found") })
		expect(() => {
			checkInputOption(['-i', './unavaibleFile.txt'])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Input and/or Output file not found")
		mockStderr.mockRestore()
	})

	it('Test dublicate error message', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error ("Input file dublicated") })
		expect(() => {
			checkInputOption(['-i', './input.txt', '-i', './unavaibleFile.txt'])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Input file dublicated")
		mockStderr.mockRestore()
	})
})

describe('Test output error', () => {
	it('Test avaible output file', () => {
		expect(checkOutputOption(['-o', './output.txt'])).toBe('./output.txt')
	})

	it('Test unavaible output file', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error ("Input and/or Output file not found") })
		expect(() => {
			checkOutputOption(['-o', './unavaibleFile.txt'])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Input and/or Output file not found")
		mockStderr.mockRestore()
	})

	it('Test dublicate error message', () => {
		const mockStderr = jest.spyOn(process.stderr, 'write')
			.mockImplementation(() => { throw new Error ("Input file dublicated") })
		expect(() => {
			checkOutputOption(['-o', './input.txt', '-o', './unavaibleFile.txt'])
		}).toThrow()
		expect(mockStderr).toHaveBeenCalledWith("Output file dublicated")
		mockStderr.mockRestore()
	})
})