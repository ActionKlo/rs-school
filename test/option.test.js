const checkConfigOption = require('../optionsCheck').checkConfig
describe('test config error', () => {
	it("test normal config", () => {
		expect(checkConfigOption(['-c', "C1"])).toBe("C1")
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
