import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import clsx from "clsx"
import moment from "moment"



const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class LineChart extends Component {

	constructor(props){
		super(props)
		this.state={
            refresh: false,
            historyLength: 6, 
            historyObject: {},
		}
    }

	componentDidMount=()=>{ 
        
        this.setState({
            historyObject: this.makeHistoryObject(),
        })
    }


    makeHistoryObject = ()=>{
        let historyObject = {};
        for (let i = this.state.historyLength; i > 0; i--){
            historyObject[moment().subtract(i, 'days').format("dddd")] 
            = (moment().subtract(i, 'days').format("YYYYMMMMDD"))
        }
		historyObject[moment().format("dddd")] = moment().format("YYYYMMMMDD")
        return historyObject
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
			console.log(data)
			return data;
		}	
		
		console.log(dataPoints())

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
				dataPoints: dataPoints()
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