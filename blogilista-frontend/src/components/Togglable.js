import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../reducers/togglableReducer'

const Togglable = (props) => {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.visible)

    const toggleVisibility = () => {
        dispatch(toggle(visible))
    }


    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div >
    )
}


export default Togglable