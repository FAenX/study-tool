import React from "react"
import {Card, IconButton} from "@material-ui/core"
import LineChart from "./LineChart"
import Refresh from "@material-ui/icons/Refresh"
import moment from "moment"

class DataViz extends React.Component{
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

    
    refresh =()=>{
        this.setState({refresh: true})
		setTimeout(()=>{
			this.setState({refresh: false})
		}, 1000)
    }
    render(){
        
        return(
           
                <Card variant="outlined" id="dataviz" className="stats-item">
                <div
                    className="stats-item-header">
                        Visualize Your Daily Progress
                
                    <IconButton onClick={this.refresh}>
                        <Refresh />
                    </IconButton>
                    
                </div>

                <LineChart 
                    historyObject={this.state.historyObject}
                    historyLength={this.state.historyLength}
                    completed={this.props.completed}
                    refresh={this.state.refresh}
                />
                </Card>
            
            
        )
    }
}

export default DataViz;