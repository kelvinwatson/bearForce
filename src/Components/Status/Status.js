import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './Status.css'

export default const Status = ( {isDarkTheme, status, statusMessage} ) => {

  const themeModifier = isDarkTheme ? 'dark-text':'light-text';
  const successIcon = status && status.success;
  const failureIcon = status && status.failure;

  return (

    <section className={`${isDarkTheme ? 'dark':'light'}`}>

      <div className={`${successIcon ? 'db':'dn'}`}>
        <i class="material-icons">
          check_circle_outline
        </i>
      </div>

      <div className={`${failureIcon ? 'db':'dn'}`}>
        <i class="material-icons">
          highlight_off
        </i>
      </div>

      <div>
        {statusMessage}
      </div>
    </section>
  )
}
