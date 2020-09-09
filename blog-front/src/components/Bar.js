import React from 'react'
import {Link} from 'react-router-dom'
import {logUserOut} from '../reducers/loginReducer'
import {visibilityChanger} from '../reducers/visibilityReducer'
import {notify} from '../reducers/notificationReducer'
import {useDispatch, useSelector} from 'react-redux'
import Message from './Message' 

const Bar = () => {
// Styles ----------------------------------
	const out = {
		backgroundColor: 'aqua',
		marginLeft: '2vw'
	}
	const logged = {
		marginLeft: '2vw',
		marginRight: '1vw',
	}
	const showButton = {
		borderRadius: '3px',
		backgroundColor: 'rgb(129, 244, 162)'
	}
	const barStyle = {
		backgroundColor : 'rgb(208, 216, 219)',
		padding: '1vh',
		width: '100vw',
		marginLeft: '-28px'
	}
	const notificationSpace = {
    height: '5vh',
    marginBottom: '1vh',
    marginTop: '1vh'
	}
// -----------------------------------------

	const dispatch = useDispatch()
	const loggedUser = useSelector(state => state.loggedUser)

	const logout = () => {
		dispatch(notify({message: 'You have logged out', style: 'added'}, 3000))
		logUserOut()
		setTimeout(() => {
			window.location.href = '/'
		}, 3000)
	}

	const showForm = () => {
		dispatch(visibilityChanger())
	}

	return(
		<div>
			<div style={barStyle}>
				<Link to='/users' id='link'>Users</Link><Link id='link' to='/blogs'>Blogs</Link>
				<span style={logged}><b>{loggedUser.username}</b> has logged in</span>
				<button onClick={showForm} style={showButton}>new blog</button>
				<button onClick={logout} style={out}> Log out </button>
			</div> 
			<div style={notificationSpace}>
				<Message/>
			</div>
		</div>
	)
}
  
export default Bar