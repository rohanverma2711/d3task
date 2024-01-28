// ScatterPlot.tsx
import React, { useEffect, useRef } from 'react';
import { select, max, scaleLinear, axisBottom, axisLeft } from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

interface ScatterPlotProps {
  data: DataPoint[];
  width: number;
  height: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    select(svgRef.current).selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
      .domain([0, max(data, (d: DataPoint) => d.x) || 1])
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([0, max(data, (d: DataPoint) => d.y) || 1])
      .range([innerHeight, 0]);

    const svg = select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d: DataPoint) => xScale(d.x))
      .attr('cy', (d: DataPoint) => yScale(d.y))
      .attr('r', 5);

    // Draw axes
    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    svg.append('g')
      .call(yAxis);
  }, [data, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default ScatterPlot;
