const moment = require('moment');

const updateTransactions = async (bot, transactionRepo, accountId) => {
	const range = await getRange(transactionRepo, accountId);
	const results = range.map(month => updateTransactionsForMonth(bot, transactionRepo, accountId, month));
	await Promise.all(results);
}

const updateTransactionsForMonth = async (bot, transactionRepo, accountId, month) => {
	await transactionRepo.clearMonth(accountId, month.format('YYYY-MM'));
	const transactions = await bot.getTransactionsForMonth(accountId, month.format('YYYY-MM'));
	await transactionRepo.createTransactions(transactions.transactions.items, accountId);
}

const updateAccount = async (bot, accountRepo, accountId) => {
	const accounts = await bot.getAccounts();
	const account = accounts.find(acc => acc.id === accountId);
	return await accountRepo.updateAccount(account);
}

const getRange = async (transactionRepo, accountId) => {
	const lastTransactionDate = await transactionRepo.getLastTransactionDate(accountId);
	const to = moment().startOf('month');
	const from = moment(lastTransactionDate).startOf('month');
	return Array.from(moment.range(from, to).by('month'));
}

const updateAccountAndTransactions = (bot, transactionRepo, accountRepo) => async (accountId) => {
	await bot.login();
	await updateAccount(bot, accountRepo, accountId);
	await updateTransactions(bot, transactionRepo, accountId);
	await bot.logout();
}

module.exports = updateAccountAndTransactions;