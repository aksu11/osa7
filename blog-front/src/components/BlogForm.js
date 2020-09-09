import React, {useState} from 'react'
import {visibilityChanger} from '../reducers/visibilityReducer'
import {useDispatch} from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
import {notify} from '../reducers/notificationReducer'
import {useHistory} from 'react-router-dom'

const BlogForm = () => {
// Styles -------------------------------------
  const addButton = {
    borderRadius: '5px',
    marginTop: '1vh',
    backgroundColor: 'rgb(91, 239, 98)'
  }

  const cancelButton = {
    borderRadius: '5px',
    marginTop: '1vh',
    marginLeft: '1vw',
    backgroundColor: 'rgb(249, 49, 49)'
  }
// --------------------------------------------

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const handleFieldChange = (event) => {
    event.preventDefault()
    if (event.target.name === 'title') setTitle(event.target.value)
    else if (event.target.name === 'author') setAuthor(event.target.value)
    else if (event.target.name === 'url') setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    if (title.length < 5|| author.length < 5 || url.length < 5) {
      dispatch(notify({style: 'error', message: 'Fill all fields, at least 5 characters'}, 4000))
    } else {
      const newBlog = {title, author, url}
      dispatch(createBlog(newBlog))
      dispatch(notify({ message: "You have added new blog '"+ title +"' by "+ author, style: 'added'}, 5000))
      setTitle('')
      setUrl('')
      setAuthor('')
      dispatch(visibilityChanger())
      history.push('/blogs')
    }
  }

  const showBlogForm = () => {
    dispatch(visibilityChanger())
  }

  return (
    <div style={{marginLeft:'50px'}}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <span>Title:</span><br></br>
        <input type='text' name='title' value={title} onChange={handleFieldChange}></input><br></br>
        <span>Author:</span><br></br>
        <input type='text' name='author' value={author} onChange={handleFieldChange}></input><br></br>
        <span>URL:</span><br></br>
        <input type='text' name='url' value={url} onChange={handleFieldChange}></input><br></br>
        <button style={addButton} type="submit">Add blog</button>
        <button style={cancelButton} onClick={showBlogForm}>Cancel</button>
      </form>
    </div>
  )
}

export default BlogForm