/**
 * Std lib
 */
import React from 'react';
// import PropTypes from 'prop-types';

/**
 * Styles
 */
import './Loading.css';

/**
 * Basic header component
 */
 const Loading = ({ isLoading, isDarkTheme }) => {
   const rippleClassName = isDarkTheme ? 'lds-ripple--dark-theme' : 'lds-ripple--light-theme';
   return (
     <div className={`Loading--visible-${isLoading}`}>
       <div className={`lds-ripple ${rippleClassName}`}><div>
       </div><div>
       </div></div>
     </div>
  )
}

export default Loading;
