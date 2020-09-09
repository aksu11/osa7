import userService from '../services/users'

const userReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ONE':
			return state.find(user => user.id === action.data)
		case 'GET_ALL':
			return state
		case 'INIT_USERS':
			return action.data
		case 'CLEAR':
			return []
		default: return state
	}
}

export const getUsers = () => {
	return async (dispatch) => {
		dispatch ({
			type : 'GET_ALL',
			data : ''
		})
	}
}

export const clearUsers = () => {
	return async (dispatch) => {
		dispatch ({
			type : 'CLEAR',
			data : ''
		})
	}
}

export const userInitialization = () => {
	return async (dispatch) => {
		const users = await userService.getUsers()
		dispatch ({
			type : 'INIT_USERS',
			data : users
		})
	}
}

export default userReducer