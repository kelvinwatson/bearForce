/**
 * Std lib
 */
import React from 'react';
// import PropTypes from 'prop-types';

/**
 * Components/Containers
 */
import SectionTitleContainer from '../../Containers/SectionTitleContainer'
import SectionGridContainer from '../../Containers/SectionGridContainer'

/**
 * Styles
 */
import './Section.css';

/**
 * Basic header component
 */
 const Section = ({
   title,
   darkTitleClassName,
   data,
   isDarkTheme }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';

   return (

     <section className={`section ${themeModifier} db dt-l w-100 border-box`}>

       <SectionTitleContainer
        title={title}
        darkTitleClassName={darkTitleClassName}/>

       <SectionGridContainer data={data}/>
     </section>
  )
}

export default Section;
