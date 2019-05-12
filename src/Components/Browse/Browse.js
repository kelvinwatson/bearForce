import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import SectionContainer from '../../Containers/SectionContainer'
import './Browse.css'

export default class Browse extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const themeModifier = this.props.isDarkTheme ? 'dark' : 'light';
    const allEventsTitle = this.props.all.title;
    const allEvents = this.props.all.data;
    const featuredEventsTitle = this.props.featured.title;
    const featuredEvents = this.props.featured.data;

    return (

        <div className={`BrowseContent ${themeModifier}`}>

          <SectionContainer
            title={featuredEventsTitle}
            darkTitleClassName={'red'}
            data={featuredEvents}
            className="section-other"/>

          <SectionContainer
            title={allEventsTitle}
            darkTitleClassName={'blue'}
            data={allEvents}
            className="section-featured"/>
        </div>
    )
  }
}
