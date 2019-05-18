import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import './Add.css'

export default class Add extends React.Component {
  constructor(props){
    super(props);
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  render(){
    DebugLog('this.props.place: ', this.props.place);
    const AutoCompleteDom = this.props.isMapLoaded ? (
      <Autocomplete
        onLoad={this.onLoad}
        onPlaceChanged={()=>this.props.onPlaceChanged(this.autocomplete.getPlace())}
      >
        <input class="autocomplete" id="autocomplete" type="text" autocomplete="off"/>
      </Autocomplete>
    ) : undefined;
    return (
        <div className={`AddContent`}>
        <input type="hidden" autocomplete="off"/>
        <fieldset>
          <legend>Add the event image</legend>
          <label for="eventImage">Image</label>
          <input class="event-image" id="eventImage" name="eventImage" type="file" onchange=";" />
        </fieldset>
        <fieldset>
          <legend>Add the event name</legend>
          <label for="eventName">Name</label>
          <input class="event-name" id="eventName" name="eventName" type="text"/>
        </fieldset>
        {AutoCompleteDom}
        <fieldset class="event-date-time">
          <legend>Add the event date and time</legend>
          <label for="eventDateTime">Date and time</label>
          <input type="datetime-local" name="datetime" id="datetime"/>
        </fieldset>
        <fieldset>
          <legend>Add the event description</legend>
          <label for="eventDescription">Description</label>
          <textarea class="event-description" id="eventDescription" name="eventDescription"/>
        </fieldset>
        <input class="event-submit" type="submit"/>
        </div>
    )
  }
}
