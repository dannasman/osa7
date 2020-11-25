import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout, loadUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'


import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import Home from './components/Home'


const App = () => {

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const notifyWith = (message, type = 'success') => {
        dispatch(setNotification({
            message, type
        }, 5))
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        dispatch(login(username, password))
        if (user) {
            notifyWith(`${user.name} welcome back!`)
        }
        else {
            notifyWith('wrong username/password', 'error')
        }
    }

    const handleLogout = () => {
        dispatch(logout(user))
    }

    if (!user) {
        return (
            <div>
                <h2>login to application</h2>

                <Notification />

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            name='username'
                        />
                    </div>
                    <div>
                        password
                        <input
                            name='password'
                        />
                    </div>
                    <button id='login'>login</button>
                </form>
            </div>
        )
    }


    const padding = {
        padding: 5
    }

    return (
        <div>
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/users">users</Link>
                </div>

                <h2>blogs</h2>

                <Notification />

                <p>
                    {user.name} logged in <button onClick={handleLogout}>logout</button>
                </p>

                <Switch>
                    <Route path="/users/:id">
                        <User users={users} />
                    </Route>
                    <Route path="/users">
                        <Users users={users} />
                    </Route>
                    <Route path="/">
                        <Home user={user} blogs={blogs} />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
