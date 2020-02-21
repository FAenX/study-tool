import React from "react"
import {Card, IconButton, Toolbar} from "@material-ui/core"
import LineChart from "./LineChart"
import Refresh from "@material-ui/icons/Refresh"
import "./DataViz.scss"

class DataViz extends React.Component{
    constructor(props){
		super(props)
		this.state={
            refresh: false,
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
                <Toolbar>
                        Visualize Your Daily Progress
                
                    <IconButton onClick={this.refresh}>
                        <Refresh />
                    </IconButton>
                    
                </Toolbar>

                <LineChart 
                    completed={this.props.completed}
                    refresh={this.state.refresh}
                />
                </Card>
            
            
        )
    }
}

export default DataViz;