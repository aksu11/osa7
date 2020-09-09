import React, {useEffect} from 'react'
import {Route, Redirect } from 'react-router-dom'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Bar from './components/Bar'
import blogService from './services/blogs'
import {useDispatch, useSelector} from 'react-redux'
import {blogInitialization} from './reducers/blogReducer'
import {beforehandLogged} from './reducers/loginReducer'
import {userInitialization} from './reducers/userReducer'
import BlogForm from './components/BlogForm'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(beforehandLogged(user))
      dispatch(blogInitialization())
      dispatch(userInitialization())
    }
  }, [dispatch])

  const visibility = useSelector((state) => state.visibility)
  const loggedUser = useSelector((state) => state.loggedUser)

  return (
    <div style={{marginLeft:'20px'}}>
      <Route path='/'>
        {loggedUser ? <Bar/> : null}
        {loggedUser ? <h2>Blogs</h2> : null}
      </Route>
      <Route exact path='/'>
        {loggedUser ? <Redirect to='/blogs'/> : <Redirect to='/login'/>}
      </Route>
      <Route path='/login'><LoginForm/></Route>
      <Route exact path='/blogs'>
        <BlogList/>
        {visibility ? <BlogForm/> : null}
      </Route>
      <Route exact path='/users'><UserList/></Route>
      <Route path='/users/:id'><SingleUser/></Route>
      <Route path='/blogs/:id'>
        <SingleBlog/>
        {visibility ? <BlogForm/> : null}
      </Route>
    </div>
  )
}

export default App