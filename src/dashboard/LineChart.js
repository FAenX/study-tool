import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import clsx from "clsx"



const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {
	

	
	
	render() {
		console.log(this.props.days)
		console.log(this.props.history)
		console.log(this.props.day)
		console.log(this.props.completed)

		const mins =(day)=>{
			let activity = this.props.history[day]
			if (day===this.props.day){
				activity = this.props.completed
			}			
			if (activity==null){
				return 0
			}
			

			activity = activity.filter(x=>{
				if(x!==null){
					return true
				}
				return false
			})
			return activity.length*30
		}

		
		
		const options = {
			animationEnabled: true,
			//exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Weekly Burnout"
			},
			axisY: {
				title: "Burn",
				includeZero: true,
				suffix: "mins"
			},
			axisX: {
				title: "Day of week",
				prefix: "Day",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Day {x}: {y}mins",
				dataPoints: [
                    { x: 0, y: mins(this.props.days[0])},
					{ x: 1, y: mins(this.props.days[1])},
					{ x: 2, y: mins(this.props.days[2])},
					{ x: 3, y: mins(this.props.days[3])},
					{ x: 4, y: mins(this.props.days[4])},
					{ x: 5, y: mins(this.props.days[5])},
					{ x: 6, y: mins(this.props.days[6])},
					
					
				]
			}]
		}
		
		return (
		<div className="chart">
			<CanvasJSChart 
				options = {options} 				
			/>
			<div className={clsx("refreshed",{
				"display-none": !this.props.refresh
			})}
			>
				refreshed
			</div>
		
		</div>
		);
	}
}

export default LineChart;                           