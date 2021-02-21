export function modelKey(prefix, action) {
	action = Object.assign({
		page: -1,
		size: -1
	}, action || {});
	return `${prefix}${action.page}:${action.size}`;
}

export function listmap(list, key = "id") {
	if (!Array.isArray(list) || !list.length) return {};
	return list.reduce((acc, item) => {
		acc[item[key]] = item;
		return acc;
	}, {});
}

export default {
	modelKey,
	listmap,
};