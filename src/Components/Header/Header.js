/**
 * Std lib
 */
import React from 'react';
// import PropTypes from 'prop-types';
import background1 from '../../Images/background1.png';

/**
 * Components/Containers
 */
import LogoContainer from '../../Containers/LogoContainer'
import NavigationContainer from '../../Containers/NavigationContainer'

/**
 * Styles
 */
import './Header.css';

/**
 * Basic header component
 */
 const Header = ({ isDarkTheme }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';

   return (

     <nav className={`header ${themeModifier} db dt-l w-100 border-box pa3`}>
        <img src={background1} className={`dn`} alt={`background`}/>
       <LogoContainer/>

       <NavigationContainer/>
     </nav>
  )
}

export default Header;
