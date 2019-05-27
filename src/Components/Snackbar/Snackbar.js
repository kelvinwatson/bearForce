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
 const Snackbar = ({ isDarkTheme, message, timeout, onErrorAcknowledged }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';

   debugger;

   let visibilityModifier = message ? 'show' : 'dn';

   if (message)
      setTimeout( onErrorAcknowledged , timeout);

   return (

     <aside
        id="snackbar"
        className={`${visibilityModifier} ${themeModifier}`}>
        {message}
     </aside>
  )
}

export default Snackbar;
