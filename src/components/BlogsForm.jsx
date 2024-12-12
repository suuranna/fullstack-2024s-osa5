import Blog from './Blog'

const BlogsForm = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLiking={props.handleLiking} />
      )}
    </div>
  )
}

export default BlogsForm