export default class Event {

  constructor(builder){
    this.eventName = builder.eventName;
    this.eventImageUrl = builder.eventImageUrl;
    this.eventPlace = builder.eventPlace;
    this.eventDateTime = builder.eventDateTime;
    this.eventEndDateTime = builder.eventEndDateTime;
    this.eventWebsiteUrl = builder.eventWebsiteUrl;
    this.eventDescription = builder.eventDescription;
  }

  static get Builder() {

    class Builder {
      /**
       * Mandatory params
       */
      constructor(eventName, eventImageUrl, eventPlace, eventDateTime){
        this.eventName = eventName;
        this.eventImageUrl = eventImageUrl;
        this.eventPlace = eventPlace;
        this.eventDateTime = eventDateTime;
      }
      /**
       * Optional end date
       */
      withEndDateTime(eventEndDateTime){
        this.eventEndDateTime = eventEndDateTime;
        return this;
      }
      /**
       * Optional link to event/ticketing details
       */
      withEventWebsiteUrl(eventWebsiteUrl){
        this.eventWebsiteUrl = eventWebsiteUrl;
        return this;
      }
      /**
       * Optional description
       */
      withEventDescription(eventDescription){
        this.eventDescription = eventDescription;
        return this;
      }
      build(){
        return new Event(this);
      }
    }
    return Builder;
  }
}
