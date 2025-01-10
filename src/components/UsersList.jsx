import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { initializeUsers } from "../reducers/usersReducer"

const UsersList = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  //console.log('userslist', users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (users.length === 0) {
    return null
  }

  //console.log('tässä blogit', users[8].blogs, ' ja pituus', users[8].blogs.length)


  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList