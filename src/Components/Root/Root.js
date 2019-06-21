import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
// import { Router, Route } from 'react-router';
// import { BrowserRouter, HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AddContainer from '../../Containers/AddContainer';
import HeaderContainer from '../../Containers/HeaderContainer';
// import App from '../../App';
import BrowseContainer from '../../Containers/BrowseContainer';
import EventContainer from '../../Containers/EventContainer';
import GoogleMapLoaderContainer from '../../Containers/GoogleMapLoaderContainer';
import ReachContainer from '../../Containers/ReachContainer';
import PortalContainer from '../../Containers/PortalContainer';
import './Root.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="Route__HeightController">

        <GoogleMapLoaderContainer/>

        <HeaderContainer/>

        <Route path="/" exact component={BrowseContainer} />
        <Route path="/browse" component={BrowseContainer} />
        <Route path="/reach" component={ReachContainer} />
        <Route path="/add" component={AddContainer} />
        <Route path="/event" component={EventContainer}/>
        <Route path="/portal" component={PortalContainer}/>
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
