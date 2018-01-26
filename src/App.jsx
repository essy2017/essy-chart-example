'use strict';

import React from 'react';

export default class App extends React.Component {

  constructor (props) {
    this.state = {
      data: [1, 2, 3, 4]
    };
  }

  render () {
    return <div>content here.</div>;
  }

}
