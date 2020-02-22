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



	makeHistory = (dayKey)=>{
		
		const history = JSON.parse(localStorage.getItem("history")) 
        if (history && this.state.historyKeysArr.length > 0)
            {
                try{
					
                    for (let i=0; i<this.state.historyLength; i++)
                    {
                        if (history[i].day === dayKey)
                        {
                            return history[i].data
                        }
                    }
                }catch{
                    for (let i=0; i<history.length; i++)
                    {
                        if (history[i].day === dayKey)
                        {
                            return history[i].data
                        }
                    }
                }
                
            }
	};

	workDoneMins =(activity)=>{				
		
		
		if (activity==null || activity === undefined){
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
		
		
		const dataPoints=()=>{
			const data = [];
			
			
			for(let i=0; i<=this.state.historyLength; i++){						
				let activity = this.makeHistory(this.state.historyKeysArr[i])
				//use local data for day today
				if (this.state.historyKeysArr[i]===moment().format("YYYYMMMMDD")){
					activity = this.props.completed
				}	
				data.push({x: i, y:this.workDoneMins(activity)});
				
				
			}
			
			return data;
		}	
		
		console.log(dataPoints())
		console.log(this.state.days)
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
							data={dataPoints()} 
						/> 
						<LineMarkSeries 
							color="purple"
							data={dataPoints()} 
							
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
