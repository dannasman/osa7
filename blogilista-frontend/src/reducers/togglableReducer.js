/* eslint-disable indent */

const togglableReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return action.data
        default:
            return state
    }
}

export const toggle = (visible) => {
    return async dispatch => {
        dispatch({
            type: 'TOGGLE',
            data: !visible
        })
    }
}

export default togglableReducer