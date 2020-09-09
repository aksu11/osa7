import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <table>
        <tbody>
          <tr><th>Users</th><th>blogs created</th></tr>
          { users.map(user => <tr key={user.id}><td><Link id='link' to={`/users/${user.id}`}>{user.username}</Link></td>
            <td>{user.blogs.length}</td></tr>) }
        </tbody>
      </table>
    </div>
  )
}

export default UserList