import React from 'react';
import PropTypes from 'prop-types';
import DebugLog from '../../Utils/DebugLog';
import ReactHLS from 'react-hls';


export default class Viewer extends React.Component {
  
  render() {

    return (
      <div>
        <ReactHLS url={"http://34.73.119.185:5080/WebRTCApp/streams/test2.m3u8"} />
      </div>
    );
  }
}
