

const tagTransactions = (tagRepo, transactionReop) => async (tag, description, isRecurring, isTransfer) => {

	await tagRepo.createTag(tag);
	await tagRepo.tagByDescription(tag, description, isRecurring, isTransfer);
}