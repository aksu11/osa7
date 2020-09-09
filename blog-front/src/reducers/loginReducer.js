import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const loginReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return action.data
		case 'LOG_OUT':
			return null
		default: return state
	}
}

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    try {
			const user = await loginService.login(credentials)
			blogService.setToken(user.token)
			window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
			dispatch ({
				type : 'LOG_IN',
				data : user
			})
			const users = await userService.getUsers()
			dispatch ({
				type : 'INIT_USERS',
				data : users
			})
			const blogs = await blogService.getAll()
			blogs.sort((a, b) => b.likes - a.likes)
			dispatch({
				type: 'INIT_BLOGS',
				data: blogs
			})
    } catch (error) {
			const id = window.localStorage.getItem('timerID')
			clearTimeout(id)
			dispatch ({
				type : 'NOTIFY',
				data : {style: 'error', message: 'Wrong username or password'}
			})
			const tid = setTimeout(() => {
				dispatch ({
					type : 'NOTIFY',
					data : {}
				})
			}, 5000);
			window.localStorage.setItem('timerID', tid)
		}
  }
}

export const logUserOut = () => {
	window.localStorage.removeItem('loggedBlogUser')
	return (dispatch) => {
		dispatch ({
			type : 'LOG_OUT',
			data : null
		})
	}
}

export const beforehandLogged = (user) => {
	return (dispatch) => {
		dispatch ({
			type: 'LOG_IN',
			data: user
		})
	}
}

export default loginReducer