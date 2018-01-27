'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Chart from './Chart';

/*******************************************************************************
 *
 * Container for the chart.
 * @class ChartContainer
 * @extends React.Component
 *
 ******************************************************************************/
export default class ChartContainer extends React.Component {

 /**
  * Lifecycle method, creates our chart.
  * @method componentDidMount
  */
  componentDidMount () {
    this.chart = new Chart(ReactDOM.findDOMNode(this), this.props);
  }

 /**
  * Lifecycle method to update our chart.
  * @method componentDidUpdate
  * @param prevProps {Object}
  * @param prevState {Object}
  */
  componentDidUpdate (prevProps, prevState) {
    this.chart.update(this.props);
  }

 /**
  * Lifecycle method to clean up chart.
  * @method componentWillUnmount
  */
  componentWillUnmount () {
    delete this.chart;
  }

 /**
  * Renders component.
  * @method render
  */
  render () {
    return <div></div>;
  }
}

/**
 * Component property definitions.
 * @property propTypes
 * @type Object
 * @static
 */
ChartContainer.propTypes = {

 /**
  * Data for chart as array of values.
  * @property data
  * @type Number[]
  */
  data: PropTypes.arrayOf(PropTypes.number).isRequired,

 /**
  * Width and height for chart.
  * @property size
  * @type Number[]
  */
  size: PropTypes.arrayOf(PropTypes.number).isRequired
};
