import React from 'react'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const Home = ({ user, blogs }) => {

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (<div>
        <Togglable buttonLabel='create new blog'>
            <NewBlog />
        </Togglable>

        {blogs.sort(byLikes).map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                own={user.username === blog.user.username}
            />
        )}
    </div>)
}

export default Home