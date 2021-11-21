const exec  = require('child_process').exec

describe('Test dublicate with child process', () => {
  it('Test dublicate config', (done) => {
    exec('node my_ciphering_cli.js -c C1-C1-A-R0 -c C0',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Config dublicated')
        done()
      }
    )
  })

	it('Test config not found', (done) => {
    exec('node my_ciphering_cli.js', 
			(error, stdout, stderr) => {
				expect(stderr).toEqual('Config not found')
				done()
      }
    )
  })

	it('Test input file not found', (done) => {
    exec('node my_ciphering_cli.js -c C1 -i ./notfoundfile.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Input and/or Output file not found')
        done()
      }
    )
  })
	
	it('Test output file not found', (done) => {
    exec('node my_ciphering_cli.js -c C1 -i ./notfoundfile.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Input and/or Output file not found')
        done()
      }
    )
  })

	it('Test invalit config', (done) => {
    exec('node my_ciphering_cli.js -c C2',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('Invalid config')
        done()
      }
    )
  })
})