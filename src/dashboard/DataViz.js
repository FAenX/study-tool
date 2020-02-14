import React from "react"
import {Card, IconButton} from "@material-ui/core"
import LineChart from "./LineChart"
import Refresh from "@material-ui/icons/Refresh"

class DataViz extends React.Component{
    constructor(props){
		super(props)
		this.state={
			refresh: false
		}
    }
    
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

                {/* <LineChart 
                    history={this.props.history}
                    completed={this.props.completed}
                    refresh={this.state.refresh}
                /> */}
                </Card>
            
            
        )
    }
}

export default DataViz;