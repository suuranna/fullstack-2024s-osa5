import { useState } from "react"

const Blog = ({ blog, handleLiking }) => {
  const [viewMore, setViewMore] = useState(false)

  const hideWhenVisible = { display: viewMore? 'none' : '' }
  const showWhenVisible = { display: viewMore ? '' : 'none' }

  const changeViewMore = () => {
    setViewMore(!viewMore)
  }

  return (
    <div className="blogStyle">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={changeViewMore}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author} <br/>
        {blog.url} <br/>
        likes: {blog.likes} <button onClick={() => handleLiking(blog)}>like</button> <br/>
        {blog.user.name} <br/>
        <button onClick={changeViewMore}>hide</button>
      </div>
    </div>
  )
}

export default Blog