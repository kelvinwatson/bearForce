import React, { Component } from 'react';
//styles
import './App.css';

class App extends Component {

  showToast = () => {
    if (window.Android)
      window.Android.showToast("test toast");
  }

  render() {
    return (
      <div className="App"/>
    );
  }
}

export default App;
