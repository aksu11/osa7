import React, {useEffect} from 'react'
import Message from './Message'
import {logUserIn} from '../reducers/loginReducer'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

const LoginForm = () => {
//Styles---------------------------------------
  const form = {
    marginLeft: '20px',
    marginTop: '1vh',
  }
  const button = {
    borderRadius: '5px',
    marginTop: '1vh',
    backgroundColor: 'rgb(91, 239, 98)'
  }
  const notificationSpace = {
    height: '5vh',
    marginBottom: '1vh',
    marginTop: '1vh'
  }
//----------------------------------------------

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      history.replace('/blogs')
    }
  })

  const login = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    const credentials = {username, password}
    dispatch(logUserIn(credentials))
  }

  return (
    <div style={form}>
      <h2>Log in to application</h2>
      <div style={notificationSpace}>
        <Message/>
      </div>
      <form onSubmit={login}>
        <span>Käyttäjätunnus:</span><br></br>
        <input type="text" name='username' autoComplete="shipping username"></input><br></br>
        <span>Salasana:</span><br></br>
        <input type="password" name='password' autoComplete="shipping password"></input><br></br>
        <button style={button} type="submit">Kirjaudu</button>
      </form> 
    </div>
  )
}

export default LoginForm