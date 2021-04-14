import React from "react";
import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    /*const onClick = () => {
        console.log('click')
    }*/

    //passing in the event object
    /*const onClick = (e) => {
        console.log(e)
    }*/

    return (
        // <button className='btn'>Add</button>
        <button
            onClick={onClick}
            style={{
                backgroundColor: color
            }}
            className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button