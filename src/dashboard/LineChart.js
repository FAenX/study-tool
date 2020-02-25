import React, { Component } from 'react';
import clsx from "clsx"
import moment from "moment"
import "./LineChart.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines,  LineMarkSeries} from 'react-vis';
import {AvarageAtPoint} from "../DataFunctions"

 
class LineChart extends Component {
	constructor(props){
		super(props)
		this.state={
            refresh: false,
			historyLength: 7, 
			len: 0,
			historyKeysArr: [],
			avarageHistoryKeysArr:[],
			days: []
		}
    }

	componentDidMount=()=>{ 
	   this.makeHistoryKeysArr()
	   this.makeAvarageHistoryKeysArr()
	}
	
    makeHistoryKeysArr = ()=>{
		let days = []
		let historyKeysArr = [];
		
        for (let i = this.state.historyLength; i >= 0; i--){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
			days.push(moment().subtract(i, 'days').format("dd"))
        }
		this.setState({
			historyKeysArr,
			days,
		})
	};

	makeAvarageHistoryKeysArr = ()=>{
		const history = JSON.parse(localStorage.getItem("history")) 
		//console.log(history.pop().day)
		// console.log(moment(history.pop().day))
		let avarageHistoryKeysArr = [];
		
        for (let i = history.length; i >= 0; i--){
            avarageHistoryKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
        }
		this.setState({
			avarageHistoryKeysArr,
		})
	};

	// filter history by key, return arr 
	filterHistory = (key)=>{
		const history = JSON.parse(localStorage.getItem("history")) 
		
		const data = history.filter(i=>{
					let data;
					if (i.day === key )
					{
						data = i.data
					}
					
					return data
				})
		
		return data[0]
	};

	//progress line graph datapoints
	dataPoints=()=>{
		let data = [];
		try{
			// map history to historyKeysArr	
			const dataOfdays = this.state.historyKeysArr.map(i=>{
				
				// if data is undefined
				let datum = this.filterHistory(i)
				if (datum===undefined){
					datum={data: []}
				}
				// use local data for day today
				if (i === moment().format("YYYYMMMMDD")){
					if(this.props.completed==null ||this.props.completed === undefined){
						datum = {data: []}
					}else{
						console.log(this.props.completed)
						datum = {data: this.props.completed}
					}
				}
				
				return datum.data.length*30
			})
			const createDataPoints = Object.keys(this.state.historyKeysArr).map(i=>{
				return {x: i, y: dataOfdays[i]}
			})
			console.log(data)
			data = createDataPoints
		}catch{
			//
		}
		
		return data;
	}
	
	// moving avarage data points
	movingAvarages =()=>{
		let data = [];
		try{
			// map history to historyKeysArr	
			const dataOfdays = this.state.avarageHistoryKeysArr.map(i=>{
				
				// if data is undefined
				let datum = this.filterHistory(i)
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

			const avarage = AvarageAtPoint(dataOfdays).mv.reverse().slice(1)
			console.log(avarage)
			console.log(this.state.avarageHistoryKeysArr)

			const createDataPoints = Object.keys(this.state.historyKeysArr).map(i=>{
				return {x: i, y: avarage[i]}
			})
			console.log(data)
			data = createDataPoints
		
		}catch{
			//
		}	
		
		return data;
		
	}

	
	
	render() {
		
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
							data={this.dataPoints()} 
							curve={'curveMonotoneX'}
						/> 
						<LineMarkSeries 
							color="purple"
							data={this.movingAvarages()} 
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
