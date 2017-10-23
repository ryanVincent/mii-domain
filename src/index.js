module.exports = (...params) => ({
	account: require('./account')(...params),
	tag: require('./tag')(...params)
});