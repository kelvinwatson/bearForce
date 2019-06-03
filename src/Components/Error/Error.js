/**
 * Std lib
 */
import React from 'react';
// import PropTypes from 'prop-types';

/**
 * Styles
 */
import './Error.css';

/**
 * Basic header component
 */
 const Error = ({ hasError, isDarkTheme }) => {
   
   return (
     <div className={`Error--visible-${hasError}`}>
       Something went wrong. Try again later.
     </div>
  )
}

export default Error;
