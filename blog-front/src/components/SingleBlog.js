import React, {useState, useEffect}  from 'react'
import {useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {notify} from '../reducers/notificationReducer'
import {likeBlog, removeBlog, comment} from '../reducers/blogReducer'
import blogService from '../services/blogs'

const SingleBlog = () => {
//Styles -------------------------------------------
  const likeButton = {
    borderRadius: '5px',
    marginLeft: '1vh',
    backgroundColor: 'rgb(91, 239, 98)'
  }
  const removeButton = {
    backgroundColor: 'aqua',
    borderRadius: '5px',
    marginTop: '1vh'
  }
//---------------------------------------------------

  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const [blog, setBlog] = useState({title: 'loading', author: 'loading', likes: 'loading', url: 'loading', user: {username: 'loading'}, comments: []})

  useEffect(() => {
    const fetchData = async (id) => {
      const b = await blogService.getOne(id)
      setBlog(b)
    }
    fetchData(id)
  },[id])

	const like = () => {
    dispatch(likeBlog(blog))
    dispatch(notify({style: 'added', message: 'You liked "' + blog.title + '" by ' + blog.author}, 3000))
    setTimeout(() => {
      history.go(0)
    }, 3000)
  }

  const remove = () => {
    if (window.confirm("Delete "+ blog.title +" by "+ blog.author+"?")) {
      dispatch(removeBlog(blog.id))
      dispatch(notify({style: 'added', message: 'You removed "'+ blog.title +'" by '+ blog.author}, 3000))
      setTimeout(() => {
        history.replace('/blogs')
      }, 3000)
    }
  }

  const submit = (event) => {
    event.preventDefault()
    const newComment = event.target.comment.value
    if(newComment !== '') {
      event.target.comment.value = ''
      dispatch(comment(blog.id, newComment))
      dispatch(notify({style: 'added', message: 'You commented "'+ blog.title +'" by '+ blog.author}, 3000))
      setTimeout(() => {
        history.go(0)
      }, 3000)                        
    }
  }
  
	return (
    <div>
      <div><b>{blog.title}</b></div>
      <a href={blog.url}>{blog.url}</a> 
      <div>by {blog.author}</div>
      <div>likes: {blog.likes} <button onClick={like} style={likeButton}>like</button></div>
      <div>Added by {blog.user.username}</div>
      <button onClick={remove} style={removeButton}>Remove</button>
      <h2>comments</h2>
      <form onSubmit={submit}>
        <input type='text' name='comment'></input>
        <button type="submit">Add comment</button>
      </form>
      <ul>{blog.comments.map(c => <li key={c.id}>{c.comment}</li>)}</ul>
    </div>
	)
}

export default SingleBlog