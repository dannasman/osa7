/* eslint-disable indent */
import loginService from '../services/login'
import storage from '../utils/storage'


const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return action.data
        case 'LOAD_USER':
            return action.data
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password
        })
        storage.saveUser(user)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logout = () => {
    return async dispatch => {
        storage.logoutUser()
        dispatch({
            type: 'LOGOUT',
            data: null
        })
    }
}

export const loadUser = () => {
    return async dispatch => {
        const user = storage.loadUser()
        dispatch({
            type: 'LOAD_USER',
            data: user
        })
    }
}

export default loginReducer