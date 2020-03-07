import React, { useState, useEffect } from 'react';
import clsx from "clsx"
import "./LineChart.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries} from 'react-vis';
import {movingAverages, dataPoints, makeDaysArr} from "./dataPoints"
import {Button,} from '@material-ui/core';
import math from "math"


const DataButton =props=>{
	const text = {
		fontSize: ".7em",
		fontWeight: "600",
		textTransform: "capitalize"
	}

	return(
			<Button style={text}>{props.title}: {props.value} mins</Button>
	)
}

const DayButton =props=>{
	const text = {
		fontSize: ".7em",
		fontWeight: "600",
		textTransform: "capitalize"
	}

	return(
			<Button style={text}>{props.day}</Button>
	)
}

const ToolTipsWrapper =props=>{
	const tooltips = {
		height: "100px", 
		width: "450px",
		// border: "1px solid #002329",
		backgroundColor: "#0023298a",
	}

	return(
		<div className="tooltips" style={tooltips}>
			<DataButton value={props.dayValue} title="time"/>
			<DataButton value={props.dayAverage} title="Average"/>
			<DayButton day={props.day}/>
		</div>
	
	)
}

const LineChart=props=> {
	const [averages, setAverages] = useState([])
	const [data, setData] = useState([])
	const [dayValue, setDayValue] = useState(0)
	const [dayAverage, setDayAverage] = useState(0)
    
	useEffect(()=>{
		const history = JSON.parse(localStorage.getItem("history")) 
		const data = dataPoints(history, props.completed, props.historyLength)
		const averages= movingAverages(history, props.completed, props.historyLength)

		setAverages(averages)
		setData(data)
	}, [props.completed, props.historyLength])
		
	
	return (
		<div className="chart">	
			<ToolTipsWrapper 
				dayValue={dayValue} 
				dayAverage={dayAverage}
				day="Should display day"
			/>
				<div className="plot">
					<XYPlot 
						height={250} 
						width={450}
					>
						<HorizontalGridLines 
							style={{stroke: "grey"}}
							
						/>
						
						<LineMarkSeries  
							color="purple"
							data={data} 
							curve={'curveMonotoneX'}
							onNearestX={(value, info)=>{
								setDayValue(value.y)
							}}
							
						/> 
						<LineMarkSeries 
							color="green"
							data={averages} 
							curve={'curveMonotoneX'}
							style={{strokeLinejoin: "round"}}
							onNearestX={(value, info)=>{
								setDayAverage(math.round(value.y))
							}}
							
							
						/>
						<XAxis 
							tickFormat={v => makeDaysArr(props.history, props.historyLength)[v]}
							tickLabelAngle={-30}
							
							style={{
								line: {stroke: 'grey'},
								text: {stroke: 'grey', fontWeight: 300}}}
							tickSize= {0}
							
						/>
						<YAxis 
							style={{
								line: {stroke: 'grey'},
								text: {stroke: 'grey', fontWeight: 300}}}
							tickSize= {0}
						/>
					
					</XYPlot>
				</div>
			
			<div className={clsx("refreshed",{
				"display-none": !props.refresh
			})}
			>
				refreshed
			</div>
		
		</div>
	);
}

export default LineChart;                           
