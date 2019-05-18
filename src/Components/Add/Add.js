import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import './Add.css'
import '../../CommonStyles/Common.css'

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
    const isDarkTheme = this.props.isDarkTheme;
    DebugLog('this.props.isDarkTheme', isDarkTheme);
    const AutoCompleteDom = this.props.isMapLoaded ? (
      <Autocomplete
        onLoad={this.onLoad}
        onPlaceChanged={()=>this.props.onPlaceChanged(this.autocomplete.getPlace())}
      >
        <input className="autocomplete pa2 input-reset ba b--black-20 w-100 measure" id="eventLocation" type="text" autocomplete="off"/>
      </Autocomplete>
    ) : undefined;
    // const FileUploaderDom = (
    //   <FileUploader
    //     accept="image/*"
    //     name="event-image"
    //     filename={file => this.state.username + file.name.split('.')[1]; }
    //     storageRef={firebase.storage().ref('images')}
    //     onUploadStart={this.handleUploadStart}
    //     onUploadError={this.handleUploadError}
    //     onUploadSuccess={this.handleUploadSuccess}
    //     onProgress={this.handleProgress}
    //   />
    // )
    return (
        <section className={`AddContent pa4 pt0 black-80 ${isDarkTheme ? 'dark' : 'light'}`}>
        <input type="hidden" autocomplete="off"/>
        <fieldset className="ba b--transparent ph0 mh0">
          <div class="mt3">
            <label className="db fw4 lh-copy f6" for="eventImage">Image</label>
            <input className="event-image pa2 input-reset ba bg-white b--black-20 w-100 measure" id="eventImage" name="eventImage" type="file" accept="image/*" placeholder="Upload" />
          </div>
        </fieldset>
        <fieldset className="ba b--transparent ph0 mh0">
          <div class="mt3">
            <label className="db fw4 lh-copy f6" for="eventName">Name</label>
            <input className="event-name pa2 input-reset ba b--black-20 w-100 measure" id="eventName" name="eventName" type="text"/>
          </div>
        </fieldset>
        <fieldset className="event-location ba b--black-20 b--transparent ph0 mh0">
          <div class="mt3">
            <label className="db fw4 lh-copy f6" for="eventLocation">Location</label>
            {AutoCompleteDom}
          </div>
        </fieldset>
        <fieldset className="event-date-time ba b--transparent ph0 mh0">
          <div class="mt3">
            <label className="db fw4 lh-copy f6" for="eventDateTime">Date and time</label>
            <input className="pa2 input-reset ba b--black-20 w-100 measure" type="datetime-local" name="datetime" id="datetime"/>
          </div>
        </fieldset>
        <fieldset className="ba b--transparent ph0 mh0">
          <div class="mt3">
            <label className="db fw4 lh-copy f6" for="eventDescription">Description</label>
            <textarea className="event-description db border-box hover-black w-100 measure ba b--black-20 pa2 mb2" aria-describedby="comment-desc" id="eventDescription" name="eventDescription"/>
            <small id="comment-desc" class="f6 black-60">The more details, the better. Can use this text to <a href="#" class="link underline black-80 hover-blue">link to more info.</a></small>
          </div>
        </fieldset>
        <div className="mt3">
          <input className="event-submit f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba b--black-20 border-box" type="submit"/>
        </div>
        </section>
    )
  }
}
