import React from 'react';
// import PropTypes from 'prop-types';
import GoogleMapCredentials from '../../.google-maps.js'
// import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { LoadScript } from '@react-google-maps/api'

 const GoogleMapLoader = ({onMapLoaded}) => {
   return (
     <LoadScript
       id="script-loader"
       googleMapsApiKey={GoogleMapCredentials.apiKey}
       libraries={['places']}
       onLoad={() => onMapLoaded()}/>
  )
}

export default GoogleMapLoader;
