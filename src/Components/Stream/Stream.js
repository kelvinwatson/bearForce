import React from 'react';
import PropTypes from 'prop-types';
// import adapter  from 'webrtc-adapter';
import WebRTCAdaptor from '../../lib/webrtc_adaptor'
import DebugLog from '../../Utils/DebugLog';

export default class Stream extends React.Component {
  componentDidMount() {
    var pc_config = null;

    var sdpConstraints = {
      OfferToReceiveAudio : false,
      OfferToReceiveVideo : false

    };
    var mediaConstraints = {
      video : true,
      audio : true
    };

    var webRTCAdaptor = new WebRTCAdaptor({
      websocket_url : "ws://34.73.119.185:5080/WebRTCApp/websocket",
      mediaConstraints : mediaConstraints,
      peerconnection_config : pc_config,
      sdp_constraints : sdpConstraints,
      localVideoId : "localVideo",
      debug: true,
      callback : function(info) {
        if (info == "initialized")
        {
          console.log("initialized");
          webRTCAdaptor.publish('test2');

        }
        else if (info == "publish_started")
        {
          //stream is being published
          console.log("publish started");
        }
        else if (info == "publish_finished")
        {
          //stream is finished
          console.log("publish finished");
        }
        else if (info == "screen_share_extension_available")
        {
          //screen share extension is avaiable
          console.log("screen share extension available");
        }
                          else if (info == "screen_share_stopped")
                          {
                                   //"Stop Sharing" is clicked in chrome screen share dialog
          console.log("screen share stopped");
        }

      },
      callbackError : function(error,msg) {
        //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

        DebugLog('error',error);
        DebugLog('msg',msg);
        alert('error');
      }
    });
  }

  render() {


    return (
      <div>
        <video id="localVideo" autoPlay muted width="100%" ></video>
      </div>
    );
  }
}
