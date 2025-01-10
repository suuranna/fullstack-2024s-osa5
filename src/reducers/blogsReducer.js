import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const likedBlog = action.payload
      return state.map(blog => blog.id === likedBlog.id ? likedBlog : blog)
    },
    removeBlog(state, action) {
      const removedBlog = action.payload
      const newBlogs = state.filter(blog => blog.id !== removedBlog.id)
      return newBlogs
    }

  }
})

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    try {
      const newBlog = await blogService.addBlog(blogObject)
      dispatch(appendBlog(newBlog))
    } catch (exception) {
      throw exception
    }
  }
}

export const updateLikes = blog => {
  return async dispatch => {
    const likedBlog = await blogService.updateBlogLikes(blog)
    dispatch(likeBlog(likedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogService.removeBlog(blog.id)
      await dispatch(removeBlog(blog))
    } catch (exception) {
      throw exception
    }
  }
}

export default blogSlice.reducer