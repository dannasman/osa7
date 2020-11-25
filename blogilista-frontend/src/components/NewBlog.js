import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { toggle } from '../reducers/togglableReducer'

const NewBlog = () => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.visible)

    const handleNewBlog = (event) => {
        event.preventDefault()
        const author = event.target.author.value
        const title = event.target.title.value
        const url = event.target.url.value

        event.target.author.value = ''
        event.target.title.value = ''
        event.target.url.value = ''

        dispatch(createBlog({
            title, author, url
        }))

        dispatch(toggle(visible))

        dispatch(setNotification({ message: `a new blog '${title}' by ${author} added!`, type: 'success' }, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    author
                    <input
                        name='author'
                    />
                </div>
                <div>
                    title
                    <input
                        name='title'
                    />
                </div>
                <div>
                    url
                    <input
                        name='url'
                    />
                </div>
                <button type="create">create</button>
            </form>
        </div>
    )
}

export default NewBlog