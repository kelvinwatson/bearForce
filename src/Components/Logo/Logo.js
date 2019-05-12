import React from 'react';
import './Logo.css';

/**
 * Basic title/logo component
 */
 const Logo = ( {isDarkTheme} ) => {
   const themeModifier = isDarkTheme ? 'dark-text':'light-text';
   return (

     <a className={`logo ${themeModifier} db dtc-l v-mid link dim w-100 w-25-l tc tl-l mb2 mb0-l`} href="/" title="Home" aria-label="BEARFORCE Home">
        <div className="dib h2 br-100">

          <span className={`logo__bear ${themeModifier} link`}>BEAR</span><span className={`logo__force ${themeModifier} link`}>FORCE</span>
        </div>
     </a>
   )
}

export default Logo;
