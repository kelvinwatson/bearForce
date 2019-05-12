export default class Event {

  constructor(builder){
    this.name = builder.name;
    this.imageUrl = builder.imageUrl;
    this.address = builder.address;
    this.startDate = builder.startDate;
    this.endDate = builder.endDate;
    this.url = builder.url;
    this.description = builder.description;
  }

  static get Builder() {

    class Builder {
      /**
       * Mandatory params
       */
      constructor(name, imageUrl, address, startDate){
        this.name = name;
        this.imageUrl = imageUrl;
        this.address = address;
        this.startDate = startDate;
      }
      /**
       * Optional end date
       */
      withEndDate(endDate){
        this.endDate = endDate;
        return this;
      }
      /**
       * Optional link to event/ticketing details
       */
      withUrl(url){
        this.url = url;
        return this;
      }
      /**
       * Optional description
       */
      withDescription(description){
        this.description = description;
        return this;
      }
      build(){
        return new Event(this);
      }
    }
    return Builder;
  }
}
