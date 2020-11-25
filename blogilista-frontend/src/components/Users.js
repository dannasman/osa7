import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import {
    Link
} from 'react-router-dom'

import { initializeUsers } from '../reducers/userReducer'

const Users = ({ users }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    return (
        <div>
            <h1>Users</h1>
            <Table >
                <tbody>
                    <tr><td></td><td style={{ fontWeight: 'bold' }}>blogs created</td></tr>
                    {
                        users.map(u => <tr key={u.id} ><td ><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>)
                    }
                </tbody>
            </Table>
        </div >

    )
}

export default Users