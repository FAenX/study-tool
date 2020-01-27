import React from "react"
import {Card} from "@material-ui/core"
import LineChart from "./LineChart"

class DataViz extends React.Component{
    render(){
        return(
           
                <Card variant="outlined" id="dataviz" className="stats-item">
                <div
                    className="stats-item-header">
                        Visualize Your Daily Progress
                </div>

                <LineChart 
                    history={this.props.history}
                    days={this.props.days}
                    completed={this.props.completed}
                    day={this.props.day} 
                />
                </Card>
            
            
        )
    }
}

export default DataViz;