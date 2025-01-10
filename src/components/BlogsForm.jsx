import Blog from './Blog'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const BlogsForm = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.slice().sort(
    (blog1, blog2) => blog2.likes - blog1.likes
  )
  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
        />
      ))}
    </div>
  )
}

BlogsForm.propTypes = {
  //user: PropTypes.object.isRequired,
  //handleLiking: PropTypes.func.isRequired,
  //handleRemovingBlog: PropTypes.func.isRequired
  //blogs: PropTypes.array.isRequired,
}

export default BlogsForm
