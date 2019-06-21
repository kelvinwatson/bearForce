/**
 * Std lib
 */
import React from 'react';
// import PropTypes from 'prop-types';

/**
 * Styles
 */
import './Success.css';

/**
 * Basic header component
 */
 const Success = ({ isSuccess, message, isDarkTheme }) => {

   return (
     <div className={`Success--visible-${isSuccess}`}>
       {message}
     </div>
  )
}

export default Success;
