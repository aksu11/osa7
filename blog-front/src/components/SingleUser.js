import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import userService from '../services/users'

const SingleUser = () => {

	const id = useParams().id
	const [user, setUser] = useState({username: 'loading', blogs: []})

	useEffect(() => {
		const fetchData = async (id) => {
			const u = await userService.getById(id)
			console.log('useEffect: ', u)
			setUser(u)
		}
		fetchData(id)
	},[id])

	if(!user) return null
	return (
		<div>
			<h3>{user.username}</h3>
			<h4>Added blogs</h4>
			<ul>
				{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
			</ul>
		</div> 
	)
}

export default SingleUser

