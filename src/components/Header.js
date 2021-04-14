
import React from 'react'
//used to be required for every react component, but not anymore

import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import Button from './Button'
//const Header = (props) => {
const Header = ({ title, onAddBtnClick, showAdd }) => {
    const onClick = () => {
        console.log('Click')
    }

    const location = useLocation()

    return (
        <header className='header'>
            {/*<h1>Task tracker</h1>*/}
            {/*<h1>{props.title}</h1>*/}
            {/*<h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1>*/}
            {/*<h1 style={ headingStyle }>{title}</h1>*/}
            <h1>{title}</h1>
            {/*<Button color='green' text='Add' onClick={onAddBtnClick} />*/}
            {/*<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAddBtnClick} />*/}
            {location.pathname === '/' && (
                <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAddBtnClick} />
            )}
            {/*<Button color='blue' text='Hello 1' />*/}
            {/*<Button color='red' text='Hello 2' />*/}
        </header>
    )
}

Header.defaultProps = {
    // title: 'Task tracker, default title'
    title: 'Task tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// CSS in JS
/*const headingStyle = {
    color: 'red', backgroundColor: 'black'
}*/

export default Header
