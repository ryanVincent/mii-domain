module.exports = (...params) => ({
	account: require('./account')(...params)
});