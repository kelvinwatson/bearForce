/**
 * Std lib
 */
import React from 'react';

/**
 * Styles
 */
import './SectionTitle.css';

/**
 * Basic header component
 */
 const SectionTitle = ({ title, darkTitleClassName, isDarkTheme }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';

   return (

     <div className={`section-title ${themeModifier} db dt-l w-100 border-box pa3 pt2 pb2`}>
      <div className={`section-title__wrapper ${themeModifier}`}>
        <span className={`section-title__text ${themeModifier} ${darkTitleClassName}`}>{title}</span>
      </div>
     </div>
  )
}

export default SectionTitle;
