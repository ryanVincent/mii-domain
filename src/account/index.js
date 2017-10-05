module.exports = (...params) => ({
	updateAccount: require('./updateAccount')(...params),
	seedAccount: require('./seedAccount')(...params)
});