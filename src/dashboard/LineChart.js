import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Weekly Progress"
			},
			axisY: {
				title: "Burn",
				includeZero: true,
				suffix: "mins"
			},
			axisX: {
				title: "Day of week",
				prefix: "D",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Day {x}: {y}mins",
				dataPoints: [
                    { x: 0, y: 300 },
					{ x: 1, y: 150 },
					{ x: 2, y: 100 },
					{ x: 3, y: 150 },
					{ x: 4, y: 20 },
					{ x: 5, y: 100},
					{ x: 6, y: 200},
					
					
				]
			}]
		}
		
		return (
		<div className="chart">
			<CanvasJSChart 
				options = {options} 				
			/>
		
		</div>
		);
	}
}

export default LineChart;                           