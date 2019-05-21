import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
import ImageEditorRc from 'react-cropper-image-editor';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from "@date-io/moment";
import 'cropperjs/dist/cropper.css';

import './Add.css'
import '../../CommonStyles/Common.css'

import Loading from '../Loading/Loading.js'

export default class Add extends React.Component {
  constructor(props){
    super(props);
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onCroppedImageChange = this.onCroppedImageChange.bind(this);
    this.onNameChanged = this.onNameChanged.bind(this);
    this.onWebsiteChanged = this.onWebsiteChanged.bind(this);
    this.onDateTimeChanged = this.onDateTimeChanged.bind(this);
    this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onImageChange(evt) {
    const file = evt.nativeEvent.srcElement.files[0];
    if(!file)
      return;
    const reader = new FileReader();
    const self = this;
    const fileSize = file.size / 1024 / 1024;//MB
    if(fileSize > 5) {
      //TODO: Emit image too big failure.
    } else {
      self.props.updateEditorLoading(true);
      reader.addEventListener("load", function () {
        self.props.onLocalImgSrcChanged(reader.result);
        self.props.updateEditorLoading(false);
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  onCroppedImageChange(imgData) {
    this.props.onCroppedImageSaved(imgData);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onNameChanged(event) {
    this.props.onNameChanged(event.target.value);
  }

  onWebsiteChanged(event) {
    this.props.onWebsiteChanged(event.target.value);
  }

  onDateTimeChanged(momentDate) {
    this.props.onDateTimeChanged(momentDate);
  }

  onDescriptionChanged(event) {
    this.props.onDescriptionChanged(event.target.value);
  }

  buildImageEditor(props) {
    if(props.localImageSrc) {
      let borderClass = props.eventPosterValidated === true ? 'b--green' : (props.eventPosterValidated === false ? 'b--red' : 'b--black-20');
      return (
        <section>
          <small id="comment-desc" className="pb2 f6 black-60">Crop and rotate your image as needed.</small>
          <ImageEditorRc
            className="mt2 w-100 measure"
            ref='cropper'
            crossOrigin='true' // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
            src={props.localImageSrc}
            guides={true}
                    rotatable={true}
            aspectRatio={3 / 4}
            movable={false}
            scalable={false}
            zoomable={false}
            zoomOnTouch={false}
            zoomOnWheel={false}
            imageName='image name with extension to download'
            saveImage={this.onCroppedImageChange} // it has to catch the returned data and do it whatever you want
            responseType='blob/base64'
            guides={false}/>
        </section>
      );
    } else if(this.props.editorLoading) {
      return (
        <section>
          <Loading isLoading={true} isDarkTheme={props.isDarkTheme}/>
        </section>
      )
    }
  }

  buildImagePreview(props) {
    if(props.croppedImgSrc) {
      return (
        <img className="cropped-img-src"
        src={props.croppedImgSrc}/>
      )
    }
  }

  buildAutoComplete(props) {
    if(props.isMapLoaded) {
      const placeBorderClass = this.getBorderClass(this.props.placeValidated, props.isDarkTheme);
      return (
        <Autocomplete
          onLoad={this.onLoad}
          onPlaceChanged={()=>this.props.onPlaceChanged(this.autocomplete.getPlace())}
        >
          <input className={`autocomplete pa2 input-reset ba ${placeBorderClass} w-100 measure`} id="eventLocation" type="text" autocomplete="off" value={props.place && props.place.formatted_address} required/>
        </Autocomplete>
      );
    }
  }

  buildDateTimePicker(props) {
    const eventDateTimeBorderClass = this.getBorderClass(this.props.eventDateTimeValidated, props.isDarkTheme);
    return (
      <div className={`bg-white pa2 input-reset ba ${eventDateTimeBorderClass} w-100 measure`}>
        <MuiPickersUtilsProvider utils={Moment}>
          <DateTimePicker value={props.eventDateTime} onChange={this.onDateTimeChanged} />
        </MuiPickersUtilsProvider>
      </div>
    );
  }

  getBorderClass(validated, isDarkTheme) {
    if(isDarkTheme) {
      return validated === true ? 'b--green' : (validated === false ? 'b--red' : 'b--white-90');
    } else {
      return validated === true ? 'b--green' : (validated === false ? 'b--red' : 'b--black-20');
    }
  }

  submitForm(e) {
    e.preventDefault();
    if (this.allFieldsValid())
      this.props.submitNewEvent(this.buildEventFromProps(this.props));
  }

  allFieldsValid() {
    return this.props.placeValidated
      && this.props.eventPosterValidated
      && this.props.eventNameValidated
      && this.props.eventWebsiteUrlValidated
      && this.props.eventDateTimeValidated
      && this.props.eventDescriptionValidated
  }

  buildEventFromProps(props){
    return {
      place: props.place,
      croppedImgSrc: props.croppedImgSrc,
      eventName: props.eventName,
      eventWebsiteUrl: props.eventWebsiteUrl,
      eventDateTime: props.eventDateTime,
      eventDescription: props.eventDescription
    }
  }

  render(){
    const isDarkTheme = this.props.isDarkTheme;
    const AutoCompleteDom = this.buildAutoComplete(this.props);
    const ImageEditorDom = this.buildImageEditor(this.props);
    const ImagePreviewDom = this.buildImagePreview(this.props);
    const DateTimePickerDom = this.buildDateTimePicker(this.props);
    const fileUploadBorderClass = this.getBorderClass(this.props.eventPosterValidated, isDarkTheme);
    const eventNameBorderClass = this.getBorderClass(this.props.eventNameValidated, isDarkTheme);
    const eventWebsiteBorderClass = this.getBorderClass(this.props.eventWebsiteUrlValidated, isDarkTheme);
    // const

    return (
        <form className={`AddContent pa4 pt0 black-80 ${isDarkTheme ? 'dark' : 'light'}`} onSubmit={this.submitForm}>
        <input type="hidden" autocomplete="off" required/>
        <fieldset className="ba b--transparent ph0 mh0">
          <div className="mt2">
            <label className={`db fw4 lh-copy f5 bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba ${fileUploadBorderClass} border-box w-100 measure`} for="eventImage"><i className="material-icons pr3">cloud_upload</i>Upload event poster / banner</label>
            <input className="dn" id="eventImage" name="eventImage" type="file" accept="image/*" placeholder="Upload" onChange={this.onImageChange} required/>
          </div>
          <div id="image-editor-container" className="mt2 w-100 measure">
            { ImageEditorDom }
            { ImagePreviewDom }
          </div>
        </fieldset>
        <fieldset className="ba b--transparent ph0 mh0">
          <div className="mt2">
            <label className="db fw4 lh-copy f6" for="eventName">Event name</label>
            <input className={`event-name pa2 input-reset ba ${eventNameBorderClass} w-100 measure`} id="eventName" name="eventName" type="text" onChange={this.onNameChanged} value={this.eventName} required/>
          </div>
        </fieldset>
        <fieldset className="event-location ba b--black-20 b--transparent ph0 mh0">
          <div className="mt2">
            <label className="db fw4 lh-copy f6" for="eventLocation">Location / Venue</label>
            {AutoCompleteDom}
          </div>
        </fieldset>
        <fieldset className="event-date-time ba b--transparent ph0 mh0">
          <div class="mt2">
            <label className="db fw4 lh-copy f6" for="eventDateTime">Date and time</label>
            {DateTimePickerDom}
          </div>
        </fieldset>
        <fieldset className="ba b--transparent ph0 mh0">
          <div class="mt2">
            <label className="db fw4 lh-copy f6" for="eventWebsite">Event website</label>
            <input className={`event-name pa2 input-reset ba ${eventWebsiteBorderClass} w-100 measure`} id="eventName" name="eventName" type="url" onChange={this.onWebsiteChanged} value={this.eventWebsiteUrl} required/>
          </div>
        </fieldset>
        <fieldset className="ba b--transparent ph0 mh0">
          <div className="mt2">
            <label className="db fw4 lh-copy f6" for="eventDescription">Description / Additional details</label>
            <textarea className="event-description db border-box hover-black w-100 measure ba b--black-20 pa2 mb2" aria-describedby="comment-desc" id="eventDescription" name="eventDescription" maxLength={1000} onChange={this.onDescriptionChanged}/>
            <small id="comment-desc" class="f6 black-60">The more details, the better. Can use this text to <a href="#" class="link underline black-80 hover-blue">link to more info.</a></small>
          </div>
        </fieldset>
        <div className="mt3">
          <input className="event-submit f5 black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba b--black-20 border-box" type="submit"/>
        </div>
        </form>
    )
  }
}
