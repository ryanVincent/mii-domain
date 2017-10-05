const moment = require('moment');

const getRange = (startMonth) => {
	const from = moment(startMonth).startOf('month');
	const to = moment().startOf('month');
	return Array.from(moment.range(from, to).by('month'));
}


//FIXME: make module
const updateTransactionsForMonth = async (bot, transactionRepo, accountId, month) => {
	await transactionRepo.clearMonth(accountId, month.format('YYYY-MM'));
	const transactions = await bot.getTransactionsForMonth(accountId, month.format('YYYY-MM'));
	await transactionRepo.createTransactions(transactions.transactions.items, accountId);
}

const seedAccount = (bot, transactionRepo, accountRepo) => async (accountId, startMonth) => {
	await bot.login();
	const range = getRange(startMonth);

	const results = range.map(month => updateTransactionsForMonth(bot, transactionRepo, accountId, month));
	await Promise.all(results);
}

module.exports = seedAccount;