export function filterUniqueItems<T>(array): T[] {
	const uniqueArray = array.reduce((result, value) => {
		const id = value._id;
		if (result[id]) return result;
		result[id] = value;

		return result;
	}, {});

	return Object.values(uniqueArray);
}
