import React from 'react';
import QueryString from 'query-string'
import DebugLog from '../../Utils/DebugLog';
import './Event.css'

export default class Event extends React.Component {

  componentDidMount() {

    // get the URL query values from router link
    const {eventDateTime,eventName} = QueryString.parse(this.props.location.search);
    DebugLog('eventDateTime',eventDateTime);
    DebugLog('eventName',eventName);

    const fromBrowsePage = this.props.location.state && this.props.location.state.fromBrowsePage;
    DebugLog('fromBrowsePage', Boolean(fromBrowsePage));

    let renderReady;
    if (fromBrowsePage) {

      //get the state from router link
      const {  state } = this.props.location;
      const {fromBrowsePage, event} = state;
      // DebugLog('fromBrowsePage',  fromBrowsePage);
      DebugLog('event',  event);

      renderReady = fromBrowsePage && event != null;
    }

    DebugLog('renderReady', Boolean(renderReady));
    if (renderReady) {

    }
    else {
      DebugLog('insufficient event data, fetch from db');
    }


  }
  render(){
    return (
        <div className={`Event`}>
          Event Page
        </div>
    )
  }
}
