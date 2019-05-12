import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AboutContainer from '../../Containers/AboutContainer';
import HeaderContainer from '../../Containers/HeaderContainer';
import App from '../../App';
import BrowseContainer from '../../Containers/BrowseContainer';
import ReachContainer from '../../Containers/ReachContainer';
import './Root.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="Route__HeightController">

        <HeaderContainer/>

        <Route path="/" exact component={BrowseContainer} />
        <Route path="/browse" component={BrowseContainer} />
        <Route path="/reach" component={ReachContainer} />
        <Route path="/about" component={AboutContainer} />
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root;
