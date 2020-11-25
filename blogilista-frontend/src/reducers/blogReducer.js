/* eslint-disable indent */
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'REMOVE_BLOG':
            return state.filter(blog =>
                blog.id !== action.data.id)
        case 'LIKE':
            return state.map(blog =>
                blog.id !== action.data.id ? blog : action.data)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addLike = (id) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const blogToChange = blogs.find(b => b.id === id)
        const updatedBlog = await blogService.update({
            ...blogToChange,
            likes: blogToChange.likes + 1,
            user: blogToChange.user.id
        })
        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })
    }
}

export const createBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        const removedBlog = await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: removedBlog
        })
    }
}

export default blogReducer