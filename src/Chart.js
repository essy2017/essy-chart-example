'use strict';

import {
  axisBottom as d3_axisBottom,
  axisLeft as d3_axisLeft,
  curveBasis as d3_curveBasis,
  line as d3_line,
  max as d3_max,
  range as d3_range,
  scaleBand as d3_scaleBand,
  scaleLinear as d3_scaleLinear,
  select as d3_select,
  transition as d3_transition
} from 'd3';

/*******************************************************************************
 *
 * A simple d3 chart.
 * @class Chart
 *
 ******************************************************************************/
export default class Chart {

 /**
  * Constructor.
  * @method constructor
  * @param node {HTMLElement} Parent node for chart.
  * @param props {Object} Properties:
  *   data {Number[]} Data.
  *   size {Number[]} [width, height] for chart.
  */
  constructor (node, props) {
    this.render(node, props);
  }

 /**
  * Performs initial render.
  * @method render
  * @param node {HTMLElement} Parent node for chart.
  * @param props {Object} See constructor for details.
  */
  render (node, props) {

    const originalProps = props;

    props = this.normalizeProps(props);

    // Main element.
    const svg = this.svg = d3_select(node).append('svg')
      .attr('width', props.outerWidth)
      .attr('height', props.outerHeight)
      .append('g')
        .attr('transform', 'translate(' + props.margin.left + ', ' + props.margin.top + ')');

    // Scales and axes.
    this.x     = d3_scaleBand().range([0, props.innerWidth]).paddingOuter(0.1);
    this.y     = d3_scaleLinear().range([props.innerHeight, 0]);
    this.xAxis = d3_axisBottom(this.x);
    this.yAxis = d3_axisLeft(this.y);

    // Render axes.
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + props.innerHeight + ')');

    svg.append('g')
      .attr('class', 'y axis');

    // Create container for the bars.
    svg.append('g')
      .attr('id', 'bars');

    // Make our line.
    svg.append('path')
      .attr('id', 'main-line')
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('stroke', '#b44');

    // Call initial update.
    this.update(originalProps);
  }

 /**
  * Updates the chart.
  * @method update
  * @param props {Object} See constructor for details.
  */
  update (props) {

    props = this.normalizeProps(props);

    const svg  = this.svg;
    const x    = this.x;
    const y    = this.y;
    const t    = d3_transition().duration(5000);
    const line = d3_line()
      .curve(d3_curveBasis)
      .x((d, i) => x(i))
      .y(d => y(d));

    // Update domain based on data.
    x.domain(d3_range(props.data.length));
    y.domain([0, d3_max(props.data)]);

    // Draw axes.
    svg.select('.x.axis')
      .transition(t)
      .call(this.xAxis);
    svg.select('.y.axis')
      .transition(t)
      .call(this.yAxis);

    // Draw bars.
    const bars = svg.select('#bars').selectAll('.bar').data(props.data);

    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', props.innerWidth)
      .attr('y', d => y(d))
      .attr('width', 0)
      .attr('height', d => props.innerHeight - y(d))
      .attr('fill', 'steelblue')
      .transition(t)
        .attr('x', (d, i) => x(i))
        .attr('width', x.bandwidth() - 1);

    bars.transition(t)
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d))
      .attr('width', x.bandwidth() - 1)
      .attr('height', d => props.innerHeight - y(d));

    bars.exit()
      .transition(t)
      .attr('x', props.innerWidth)
      .attr('width', 0)
      .remove();

    // Draw line.
    svg.select('#main-line')
      .datum(props.data)
      .transition(t)
      .attr('transform', 'translate(' + (x.bandwidth() / 2) + ',0)')
      .attr('d', line);

  }

 /**
  * "Normalizes" the props, so we get consistent values in render() and update().
  * @method normalizeProps
  * @param props {Object} See constructor for details.
  * @return {Object} With properties:
  *   data {Number[][]}
  *   innerHeight {Number}
  *   innerWidth {Number}
  *   margin {Number}
  *   outerWidth {Number}
  *   outerHeight {Number}
  */
  normalizeProps (props) {

    const margin = { top: 10, right: 10, bottom: 20, left: 25 };
    return Object.assign({}, props, {
      innerHeight : props.size[1] - margin.top - margin.bottom,
      innerWidth  : props.size[0] - margin.left - margin.right,
      margin      : margin,
      outerHeight : props.size[1],
      outerWidth  : props.size[0]
    });

  }

}
