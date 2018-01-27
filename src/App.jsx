'use strict';

import React from 'react';
import ChartContainer from './ChartContainer';

/**
 * Gets array of random data.
 * @method getData
 * @return {Number[]}
 */
function getData () {

  //const n   = 10;
  const min = 0;
  const max = 20;

  const n = 10 + Math.round(Math.random() * (20 - 10));

  let data = [];

  for (let i = 0; i < n; i++) {
    data.push(min + Math.random() * (max - min));
  }

  return data;
}

/*******************************************************************************
 *
 * The main application entry point.
 * @class App
 * @extends React.Comopnent
 *
 ******************************************************************************/
export default class App extends React.Component {

 /**
  * Constructor.
  * @method constructor
  * @param props {Object}
  */
  constructor (props) {
    super(props);
    this.state = {
      data: getData(),
      size: [800, 300],
      show: true
    };
    this.handleClickBtn = this.handleClickBtn.bind(this);
  }

 /**
  * Handler for clicks on button.
  * @method handleClickBtn
  */
  handleClickBtn () {
    this.setState({
      data: getData()
    });
  }

  handleClickTest () {
    this.setState({
      show: !this.state.show
    });
  }

 /**
  * Renders component.
  * @method render
  */
  render () {
    return (
      <div>
        <button onClick={this.handleClickBtn}>Refresh</button>
        <button onClick={this.handleClickTest.bind(this)}>Toggle</button>
        {
          this.state.show &&
          <ChartContainer
            data={this.state.data}
            size={this.state.size}
          />
        }
      </div>
    );
  }

}
