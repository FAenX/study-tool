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
			historyKeysArr: [],
			avarageHistoryKeysArr:[],
			days: []
		}
    }

	componentDidMount=()=>{ 
		
	}
	
    makeHistoryKeysArr =()=>{
		let days = []
		let historyKeysArr = [];
		
		for (let i = 0; i < this.props.historyLength;  i++){
			historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
			days.push(moment().subtract(i, 'days').format("dd"))
		}

		days = days.reverse()
		historyKeysArr = historyKeysArr.reverse()

		this.setState({
			historyKeysArr,
			days,
		})
	};

	// create an array of dataPoint keys 
	makeAvarageHistoryKeysArr =(history)=>{
		// the last data in array was the first to be recorded
		const earliestData = history.pop().day
		
		let avarageHistoryKeysArr = [];
		// the whole duration recorded
		const duration = moment.duration(moment().diff(moment(earliestData))).asDays()
		// create list of keys == datapoints
		for (let i = 0; i < duration; i++){
			avarageHistoryKeysArr.push(moment(earliestData).add(i, 'days').format("YYYYMMMMDD"));
		}
		
		this.setState({
			avarageHistoryKeysArr,
		})
	};
	
	


	//progress line graph datapoints
	dataPoints=(history)=>{
		let data = [];
		try{
			// map history to historyKeysArr	
			const dataOfdays = this.state.historyKeysArr.map(i=>{
				
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
			const createDataPoints = Object.keys(this.state.historyKeysArr).map(i=>{
				return {x: i, y: dataOfdays[i]}
			})
			
			data = createDataPoints
		}catch{
			//
		}
		console.log(data)
		return data;
	}
	
	// moving avarage data points
	movingAvarages =(history)=>{
		let data = [];
		try{
			// map history to historyKeysArr	
			const dataOfdays = this.state.avarageHistoryKeysArr.map(i=>{
				
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

			const avarageHistoryLength = this.state.avarageHistoryKeysArr.length-this.props.historyLength
			console.log(AvarageAtPoint(dataOfdays))
			const avarage = AvarageAtPoint(dataOfdays).reverse().slice(avarageHistoryLength)
			
			const createDataPoints = Object.keys(this.state.historyKeysArr).map(i=>{
				return {x: i, y: avarage[i]}
			})
			data = createDataPoints
		
		}catch{
			//
		}	
		
		return data;
		
	}

	
	
	render() {

		const history = JSON.parse(localStorage.getItem("history")) 
		try{
			this.makeHistoryKeysArr()
			this.makeAvarageHistoryKeysArr(history)
		}catch{

		}
	  


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
							data={this.dataPoints(history)} 
							curve={'curveMonotoneX'}
						/> 
						<LineMarkSeries 
							color="purple"
							data={this.movingAvarages(history)} 
							curve={'curveMonotoneX'}
							
						/>
						<XAxis 
							
							tickFormat={v => this.state.days[v]}
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
