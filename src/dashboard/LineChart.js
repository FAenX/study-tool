import React, { Component } from 'react';
import clsx from "clsx"
import moment from "moment"
import "./LineChart.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';



 
class LineChart extends Component {

	constructor(props){
		super(props)
		this.state={
            refresh: false,
            historyLength: 6, 
			historyObject: {},
			days: []
		}
    }

	componentDidMount=()=>{ 
        
       this.makeHistoryObject()
     
    }


    makeHistoryObject = ()=>{
		let days = []
        let historyObject = {};
        for (let i = this.state.historyLength; i > 0; i--){
            historyObject[moment().subtract(i, 'days').format("dddd")] 
			= moment().subtract(i, 'days').format("YYYYMMMMDD");
			days.push(moment().subtract(i, 'days').format("dddd"))
        }
		historyObject[moment().format("dddd")] = moment().format("YYYYMMMMDD")
	   
		this.setState({
			historyObject,
			days,
		})
    }; 



	makeHistory = (dayKey)=>{
		
		const history = JSON.parse(localStorage.getItem("history")) 
        if (history && Object.keys(this.state.historyObject).length > 0)
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
			const dayKeys = Object.keys(this.state.historyObject)
			
			for(let i=0; i<=this.state.historyLength; i++){						
				let activity = this.makeHistory(this.state.historyObject[dayKeys[i]])
				//use local data for day today
				if (this.state.historyObject[dayKeys[i]]===moment().format("YYYYMMMMDD")){
					activity = this.props.completed
				}	
				data.push({x: i, y:this.workDoneMins(activity)});
				
				
			}
			
			return data;
		}	
		
		console.log(dataPoints())
		console.log(this.state.historyObject[0])

		
		
		return (
		<div className="chart">			
				
				<div className="plot">
					<XYPlot 
						height={300} 
						width={450}
						
						
					>
						<HorizontalGridLines />
						
						<LineSeries 
							color="maroon"
							data={dataPoints()} 
						/>
						<XAxis 
							tickTotal={this.state.historyLength} 
							tickFormat={v => this.state.days[v]}
							tickLabelAngle={-45}
							style={{
								line: {stroke: '#ADDDE1'},
								ticks: {stroke: '#ADDDE1'},
								text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}}}
							tickSize= {0}
							
						/>
						<YAxis 
							style={{
								line: {stroke: '#ADDDE1'},
								ticks: {stroke: '#ADDDE1'},
								text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}}}
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
