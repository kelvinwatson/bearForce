/**
 * Std lib
 */
import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
// import DebugLog from '../../Utils/DebugLog';
/**
 * Styles
 */
import './SectionGrid.css';

/**
 * Basic header component
 */
 const SectionGrid = ({ isDarkTheme, onItemClick, data }) => {

   const themeModifier = isDarkTheme ? 'dark' : 'light';
   return (

     <section className={`section-grid ${themeModifier} cf w-100`}>
      { data.map((event)=> {

        return (

        <div className={`fl w-50 w-25-l link overflow-hidden`}>
          <div className="aspect-ratio aspect-ratio--3x4 overflow-hidden">
            <div className="SectionGridItemContainer bg-center aspect-ratio--object grow">

              <img className={`SectionGridItemImage cover section-grid__image`} src={`${event.eventImageUrl}`} alt={`${event.eventName}`}/>


              <Link to={{
                  pathname: '/event',
                  search: '?eventName=' + event.eventName + '&eventDateTime='+  event.eventDateTime,
                  state: {
                    fromBrowsePage: true,
                    event: event
                  },
                }}
                className="SectionGridItem__OverlayContainer ma1"
              />

              <Link to={{
                  pathname: '/event',
                  search: '?eventName=' + event.eventName + '&eventDateTime='+  event.eventDateTime,
                  state: {
                    fromBrowsePage: true,
                    event: event
                  },
                }}
                className="SectionGridItem__OverlayText">
                <span className={`SectionGridItem__EventName f3 fw2 mb3 mt4 mt0-ns sans-serif`}>{event.eventName}</span>
                <br/>
                <span className={`SectionGridItem__StartDate f6`}>{event.eventDateTime}</span>
                <br/>
                <span className={`SectionGridItem__Address f6`}>{event.eventPlace}</span>
              </Link>
            </div>
          </div>
        </div>
      )

      })}
     </section>
  )
}

export default SectionGrid;
