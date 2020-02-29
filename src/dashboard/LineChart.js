import React, { Component } from 'react';
import clsx from "clsx"
import moment from "moment"
import "./LineChart.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines,  LineMarkSeries} from 'react-vis';
import {AvarageAtPoint, filterHistory} from "../DataFunctions"

 
class LineChart extends Component {
	constructor(props){
		super(props)
		this.state={
            refresh: false,
			len: 0,
			days: [],
		}
    }

    makeHistoryKeysArr =()=>{
		let historyKeysArr = [];
		for (let i = 0; i < this.props.historyLength;  i++){
			historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
		}
		historyKeysArr = historyKeysArr.reverse()
		return historyKeysArr
	};

	makeDaysArr=()=>{
		let days = []
		for (let i = 0; i < this.props.historyLength;  i++){
			days.push(moment().subtract(i, 'days').format("dd"))
		}
		days = days.reverse()
		return days
	}

	// create an array of dataPoint keys 
	makeAvarageHistoryKeysArr =(history)=>{
		// the last data in array was the first to be recorded
		const earliestData = history[history.length-1].day		
		let avarageHistoryKeysArr = [];
		// the whole duration recorded
		const duration = moment.duration(moment().diff(moment(earliestData))).asDays()
		// create list of keys == datapoints
		for (let i = 0; i < duration; i++){
			avarageHistoryKeysArr.push(moment(earliestData).add(i, 'days').format("YYYYMMMMDD"));
		}
		return avarageHistoryKeysArr
	};

	//progress line graph datapoints
	dataPoints=(history)=>{
		// map history to historyKeysArr	
		const dataOfdays = this.makeHistoryKeysArr().map(i=>{
			// if data is undefined
			let datum = filterHistory(history, i)
			if (datum===undefined){
				datum={data: []}
			}
			// use local data for day today
			if (i === moment().format("YYYYMMMMDD")){
				if(this.props.completed==null ||this.props.completed === undefined){
					datum = {data: []}
				}else{
					datum = {data: this.props.completed}
				}
			}
			return datum.data.length*30
		})
		const createDataPoints = Object.keys(this.makeHistoryKeysArr()).map(i=>{
			return {x: i, y: dataOfdays[i]}
		})
		return createDataPoints
	}
	
	// moving avarage data points
	movingAvarages =(history)=>{
		// map history to historyKeysArr	
		const dataOfdays = this.makeAvarageHistoryKeysArr(this.props.history).map(i=>{
			// if data is undefined
			let datum = filterHistory(history, i)
			if (datum===undefined){
				datum={data: []}
			}
			// use local data for day today
			if (i === moment().format("YYYYMMMMDD")){
				if(this.props.completed==null ||this.props.completed === undefined){
					datum = {data: []}
				}else{
					datum = {data: this.props.completed}
				}
			}
			return datum.data.length*30
		})
		const avarageHistoryLength = this.makeAvarageHistoryKeysArr(this.props.history).length-this.props.historyLength
		const avarage = AvarageAtPoint(dataOfdays).reverse().slice(avarageHistoryLength)
		const createDataPoints = Object.keys(this.makeHistoryKeysArr()).map(i=>{
			return {x: i, y: avarage[i]}
		})
		return createDataPoints
	}

	render() {
		const avaragePoints = this.movingAvarages(this.props.history)
		const dataPoints = this.dataPoints(this.props.history)

		return (
			<div className="chart">	
					<div className="plot">
						<XYPlot 
							height={300} 
							width={500}
						>
							<HorizontalGridLines />
							<LineMarkSeries  
								color="green"
								data={dataPoints} 
								curve={'curveMonotoneX'}
								
							/> 
							<LineMarkSeries 
								color="purple"
								data={avaragePoints} 
								curve={'curveMonotoneX'}
								
							/>
							<XAxis 
								
								tickFormat={v => this.makeDaysArr()[v]}
								tickLabelAngle={-30}
								
								style={{
									line: {fill: '#002329'},
									text: {stroke: 'none', fill: '#002329', fontWeight: 400}}}
								tickSize= {0}
								
							/>
							<YAxis 
								style={{
									line: {fill: '#002329'},
									text: {stroke: 'none', fill: '#002329', fontWeight: 400}}}
								tickSize= {0}
							/>
						
						</XYPlot>
					</div>
				
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
