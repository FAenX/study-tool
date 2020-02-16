import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import clsx from "clsx"
import moment from "moment"



const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {


	makeData = (history)=>{
		const data = [];
		const keys = Object.keys(this.props.historyObject)
		for(let i=0; i<keys.length; i++)
		{
			data.push({x: i, y:this.workDoneMins(history, this.props.historyObject[keys[i]])});
		}		
		return data;
	};

	workDoneMins =(history, day)=>{				
		const filterActivity =()=>{			
			for(let i=0; i<history.length; i++){
				if (history[i].day.trim()===day.trim()){					
					return history[i].data
				}
				return 
			}
		}
		console.log(filterActivity())
		let activity = filterActivity();
		console.log(day)		
		// if (day===moment().format("YYYYMMMMDD")){
		// 	activity = this.props.completed
		// }			
		if (activity==null){
			return 0
		}
		//clean activity data by removing null values
		activity = activity.filter(x=>{
			if(x!==null){
				return true
			}
			return false
		})
		//each cell is thirty mins long
		return activity.length*30
	}
	
	render() {
		const history = JSON.parse(localStorage.getItem("history"))
		const dataPoints=this.makeData(history)
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
				dataPoints,
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