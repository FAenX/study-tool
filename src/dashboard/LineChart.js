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
			historyKeysArr: {},
			days: []
		}
    }

	componentDidMount=()=>{ 
       this.makeHistoryKeysArr()
	}
	
    makeHistoryKeysArr = ()=>{
		let days = []
		let historyKeysArr = [];
		
        for (let i = this.state.historyLength; i >= 0; i--){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
			days.push(moment().subtract(i, 'days').format("dddd"))
        }
		this.setState({
			historyKeysArr,
			days,
		})
    }; 
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

	dataPoints=()=>{
		let data = [];
		try{
			// console.log(this.filterHistory("2020February16"))	
			const dataOfdays = this.state.historyKeysArr.map(i=>{
				// use local data for day today
				
				let datum = this.filterHistory(i)
				if (datum===undefined){
					datum={data: []}
				}

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

			data = createDataPoints

			
			
				
				
			
		}catch{
			//
		}	
			
		
		
		return data;
	}	

	
	
	render() {
		
		
		
		
		console.log(this.dataPoints())
		
		console.log(this.state.historyKeysArr)
		const data =  [
			{"data":[0],"_id":"5e504dfdea4f5b0017b3aff7","day":"2020February22","__v":0},
			{"data":[0,1,2,3,4,5],"_id":"5e4ff579cad738001712deae","day":"2020February21","__v":0},
			{"data":[0,1,2,3,4,5,6,7,8,9,10,11],"_id":"5e4d3253718e8c00176c60d9","day":"2020February19","__v":0},
			{"data":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"_id":"5e49aef527d2a20017d223ea","day":"2020February17","__v":0},
			{"data":[0,1,2,3,4,5],"_id":"5e485e0af0fd2300177b9aea","day":"2020February16","__v":0},
			{"data":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],"_id":"5e482bf5bcef97193b523d3f","day":"2020February15","__v":0}
		]
		console.log(AvarageAtPoint(data, 0))
		
		const movingAvarages = [{x: 0, y: 340},
								{x: 1, y: 180},
								{x: 2, y: 340},
								{x: 3, y: 200},
								{x: 4, y: 260},
								{x: 5, y: 200},
								{x: 6, y: 280},
								{x: 7, y: 200},
						]
		return (
		<div className="chart">			
				
				<div className="plot">
					<XYPlot 
						height={300} 
						width={450}
						
						
					>
						<HorizontalGridLines />
										
						<LineMarkSeries  
							color="green"
							data={this.dataPoints()} 
						/> 
						<LineMarkSeries 
							color="purple"
							data={movingAvarages} 
							
						/>
						<XAxis 
							
							tickFormat={v => this.state.days[v]}
							tickLabelAngle={-45}
							
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
