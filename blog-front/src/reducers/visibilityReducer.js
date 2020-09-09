
const visibilityReducer = (state = false, action) => {
	switch (action.type) {
		case 'CHANGE_VISIBILITY':
			return !state
		default: return state
	}
}

export const visibilityChanger = () => {
	return (dispatch) => {
		dispatch ({
			type: 'CHANGE_VISIBILITY',
			data: ''
		})
	}
}

export default visibilityReducer