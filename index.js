var chalk = require('chalk')

var clearConsole = require('./utils/clearConsole')
var formatWebpackMessages = require('./utils/formatWebpackMessages')
var openBrowser = require('./utils/openBrowser')

class WebpackPrinter {
	constructor(options) {
		options = options || {}
		this.port = options.port || 8000
		this.experimental = options.experimental || false
	}

	apply(compiler) {
		var isFirstCompile = true

		compiler.plugin('done', stats => {
            
			clearConsole()

			var messages = formatWebpackMessages(stats.toJson({}, true))
			var hasErrors = stats.hasErrors()
			var hasWarnings = stats.hasWarnings()
			var isSuccessful = !messages.errors.length && !messages.warnings.length
			var showInstructions = isSuccessful && isFirstCompile

			if (isSuccessful) {
				console.log(chalk.green('Compiled successfully!'))
			}

			if (showInstructions) {
				console.log()
				console.log('The app is running on http://localhost:' + this.port)
				console.log()
				openBrowser('http://localhost:' + this.port + '/')
				isFirstCompile = false
			}

			if (hasErrors) {
				console.log(chalk.red('Failed to compile.'))
				console.log()

				if (this.experimental) {
					messages.errors[0] = messages.errors[0].split('@')[0]
				}

				messages.errors.forEach(message => {
					console.log(message)
				})
				return
			}

			if (hasWarnings) {
				console.log(chalk.yellow('Compiled with warnings.'))
				console.log()

				if (this.experimental) {
					messages.warnings[0] = messages.warnings[0].split('@')[0]
				}

				messages.warnings.forEach(message => {
					console.log(message)
				})
				return
			}
		})

		compiler.plugin('invalid', () => {
			console.log(chalk.cyan('Loading'))
		})
	}
}

module.exports = WebpackPrinter
