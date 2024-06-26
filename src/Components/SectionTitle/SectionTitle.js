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
        <h3 className={`section-title__text ${themeModifier} ${darkTitleClassName} lh-title fw9 mb3 mt0 pt3`}>{title}</h3>
      </div>
     </div>
  )
}

export default SectionTitle;
