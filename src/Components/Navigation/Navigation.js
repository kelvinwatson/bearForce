import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navigation.css';
import '../../CommonStyles/Common.css';

/**
 * Basic navigation component
 */
 const Navigation = ({ page, list, onNavigationClicked, onChangeTheme, isDarkTheme }) => {

   const themeModifier = isDarkTheme ? 'dark-text' : 'light-text';
   return (


     <section className="db dtc-l v-mid w-100 w-75-l tc tr-l">

        <Link className={`navigation__link ${themeModifier} link dim f6 f5-l dib mr3 mr4-l`} to="/browse" onClick={(e) => onNavigationClicked('browse')}>
          Browse
        </Link>

        <Link className={`navigation__link ${themeModifier} link dim f6 f5-l dib mr3 mr4-l`} to="/about" onClick={(e) => onNavigationClicked('me')}>
          Add
        </Link>

        <Link className={`navigation__link ${themeModifier} link dim f6 f5-l dib mr3 mr4-l`} to="/reach" onClick={(e) => onNavigationClicked('reach')}>
          Reach
        </Link>

        <input className={`${themeModifier} link dim f6 f5-l dib`} type="checkbox" onClick={(e) => onChangeTheme(isDarkTheme)}/>

      </section>
  )
}

export default Navigation;
