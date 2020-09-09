

const notificationReducer = (state = {}, action) => {
	switch (action.type) {
		case 'NOTIFY':
			return action.data
		default: return state
	}
}

export const notify = (content, time ) => {
	const id = window.localStorage.getItem('timerID')
	clearTimeout(id)
	return async (dispatch) => {
		dispatch ({
			type : 'NOTIFY',
			data : content
		})
		const tid = setTimeout(() => {
			dispatch ({
				type : 'NOTIFY',
				data : {}
			})
		}, time);
		window.localStorage.setItem('timerID', tid)
	}
}

export default notificationReducer