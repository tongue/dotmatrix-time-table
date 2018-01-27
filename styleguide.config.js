const path = require('path')

module.exports = {
	template: 'src/common/index.html',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/common/Provider')
	}
}

