
import React from 'react'

import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'
const Header = ({ title, onAddBtnClick, showAdd }) => {
    const onClick = () => {
        console.log('Click')
    }

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAddBtnClick} />
            )}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


export default Header
