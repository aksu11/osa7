import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'

const BlogList = () => {
//Styles----------------------------------------
  const boxStyle = {
    'border': '1px solid blue',
    'marginBottom': '3px',
    'width': '70vw'
  }
//----------------------------------------------
  const blogs = useSelector(state => state.blogs)
  const history = useHistory()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (!loggedUserJSON) {
      history.replace('/login')
    }
  })

  return (
    <div>
      <div>
        { blogs.map(blog => <div key={blog.id} style={boxStyle}><Link id='link' to={`/blogs/${blog.id}`}>{blog.title}</Link></div>) }
      </div>
    </div>
  )
}

export default BlogList