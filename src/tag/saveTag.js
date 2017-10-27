

const saveTag = (tagRepo) => async (tag, description, isRecurring, isTransfer) => {
	await tagRepo.createAutoTag(tag, description, isRecurring, isTransfer);
}

module.exports = saveTag;