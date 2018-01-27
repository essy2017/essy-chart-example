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
    this.handleClickBtn     = this.handleClickBtn.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

 /**
  * Lifecycle method.
  * @method componentDidMount
  */
  componentDidMount () {
    this.setState({
      size: [this.el.parentNode.offsetWidth, 300]
    });
    window.addEventListener('resize', this.handleWindowResize, this);
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

 /**
  * Handler for window resize events.
  * @method handleWindowResize
  */
  handleWindowResize () {
    this.setState({
      size: [this.el.parentNode.offsetWidth, 300]
    });
  }

 /**
  * Renders component.
  * @method render
  */
  render () {
    return (
      <div ref={el => {this.el = el}}>
        <button onClick={this.handleClickBtn}>Refresh</button>
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
