/**
 * Std lib
 */
import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import DebugLog from '../../Utils/DebugLog';
/**
 * Styles
 */
import './SectionGrid.css';

/**
 * Basic header component
 */
 const SectionGrid = ({ isDarkTheme, onItemClick, data }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';
   DebugLog('SectionGrid', data);
   return (

     <section className={`section-grid ${themeModifier} cf w-100 pa3`}>
      {data.map((evt)=>

        <div className={`fl w-50 w-third-m w-25-ns`}>
          <div className="aspect-ratio aspect-ratio--3x4">
            <div className="SectionGridItemContainer bg-center aspect-ratio--object pa1">

              <img className={`SectionGridItemImage cover section-grid__image`} src={`${evt.eventImageUrl}`} alt={`${evt.eventName}`}/>



              <Link to={`/event/${evt.eventName}/${evt.eventDateTime}`} className="SectionGridItem__OverlayContainer ma1"/>

              <Link to={`/event/${evt.eventName}/${evt.eventDateTime}`} className="SectionGridItem__OverlayText">
                <span className={`SectionGridItem__EventName f3`}>{evt.eventName}</span>
                <br/>
                <span className={`SectionGridItem__StartDate f6`}>{evt.eventDateTime}</span>
                <br/>
                <span className={`SectionGridItem__Address f6`}>{evt.eventPlace}</span>
              </Link>
            </div>
          </div>
        </div>

      )}
     </section>
  )
}

export default SectionGrid;
