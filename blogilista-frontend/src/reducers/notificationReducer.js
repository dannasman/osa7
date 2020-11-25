/* eslint-disable indent */
var timeout

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return (action.notification)
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return async dispatch => {
        clearTimeout(timeout)
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        timeout = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        }, time * 1000)
    }
}

export default notificationReducer
