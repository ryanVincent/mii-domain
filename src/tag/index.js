module.exports = (...params) => ({
	tagTransactions: require('./tagTransactions')(...params),
	saveTag: require('./saveTag')(...params),

});