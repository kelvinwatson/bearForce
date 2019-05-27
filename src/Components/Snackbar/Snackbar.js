/**
 * Std lib
 */
import React from 'react';

/**
 * Styles
 */
import './Snackbar.css';

/**
 * Basic header component
 */
 const Snackbar = ({ isDarkTheme, message, timeout }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';

   let visibilityModifier = 'show';

   setTimeout( () => {
     visibilityModifier = '';
   }, timeout);

   return (

     <aside
        id="snackbar"
        className={`${visibilityModifier} ${themeModifier}`}>
        {message}
     </aside>
  )
}

export default Snackbar;
