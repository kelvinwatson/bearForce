/**
 * Std lib
 */
import React from 'react';
import PropTypes from 'prop-types';
import DebugLog from '../../Utils/DebugLog';
/**
 * Styles
 */
import './SectionGrid.css';

/**
 * Basic header component
 */
 const SectionGrid = ({ isDarkTheme, data }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';
   DebugLog('SectionGrid', data);
   return (

     <section className={`section-grid ${themeModifier} cf w-100 pa3`}>
      {data.map((evt)=>

        <div className="fl w-50 w-third-m w-25-ns">
          <div className="aspect-ratio aspect-ratio--9x16">
            <div className="bg-center aspect-ratio--object pa2">
              <img className={`cover section-grid__image`} src={`${evt.imageUrl}`}/>
            </div>
          </div>
        </div>

      )}
     </section>
  )
}

export default SectionGrid;
