import { useRef } from 'react'
import AddBlogForm from '../components/AddBlogForm'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import LoggedInHeader from '../components/LoggedInHeader'
import BlogsForm from '../components/BlogsForm'


const FrontPage = () => {
  const addBlogFormRef = useRef()

  const changeAddBlogFormsVisibility = () => {
    addBlogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <LoggedInHeader/>
      <Notification/>
      <BlogsForm/>
      <Togglable buttonLabel={'new blog'} ref={addBlogFormRef}>
        <AddBlogForm changeVisibility={(() => changeAddBlogFormsVisibility())} />
      </Togglable>
    </div>
  )
}

export default FrontPage