import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const before = state.filter(b => b.id !== action.data.id)
      const after = before.concat(action.data)
      return after.sort((a, b) => b.likes - a.likes)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'COMMENT':
      const old = state.filter(b => b.id !== action.data.id)
      return old.concat(action.data)
    case 'REMOVE':
      return state.filter(blog => blog.id !== action.data)
    default: return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const added = await blogService.create(blog)
    if(added.status === 201) {
      dispatch ({
        type : 'CREATE',
        data : added.data
      })
    } 
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updated = await blogService.update(blog)
    if(updated.status === 200){
      dispatch ({
        type : 'LIKE',
        data : updated.data
      })
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    const removed = await blogService.remove(id)
    if(removed.status === 204) {
      dispatch ({
        type: 'REMOVE',
        data: id
      })
    }
  }
}

export const comment = (id, comment) => {
  return async (dispatch) => {
    const updated = await blogService.addComment(id, comment)
    if(updated.status === 200) {
      dispatch ({
        type : 'COMMENT',
        data : updated.data
      })
    }
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer