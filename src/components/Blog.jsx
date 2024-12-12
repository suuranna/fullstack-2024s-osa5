import { useState } from "react"

const Blog = ({ blog, handleLiking, user, handleRemovingBlog }) => {
  const [viewMore, setViewMore] = useState(false)
  const hideWhenViewMore = { display: viewMore ? 'none' : '' }
  const showWhenViewMore = { display: viewMore ? '' : 'none' }
  const showRemoveButton = { display: user.user_id === blog.user.id ? '' : 'none' }

  const changeViewMore = () => {
    setViewMore(!viewMore)
  }

  return (
    <div className="blogStyle">
      <div style={hideWhenViewMore}>
        {blog.title} by {blog.author} <button onClick={changeViewMore}>view</button>
      </div>
      <div style={showWhenViewMore}>
        {blog.title} by {blog.author} <button onClick={changeViewMore}>hide</button> <br/>
        {blog.url} <br/>
        likes: {blog.likes} <button onClick={() => handleLiking(blog)}>like</button> <br/>
        {blog.user.name} <br/>
        <div style={showRemoveButton}>
          <button onClick={() => handleRemovingBlog(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog