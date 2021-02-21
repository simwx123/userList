import * as actionTypes from "./actionTypes";

export function getUsers(querystr: string) {
	return function (dispatch: DispatchType) {
		fetch(`https://reqres.in/api/users${querystr}`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				accept: "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				const { data, page, per_page, total } = response;
				dispatch({
					type: actionTypes.GET_USERS,
					user: data,
					page,
					size: per_page,
					total,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};
}
