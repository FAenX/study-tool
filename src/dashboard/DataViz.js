import React from "react"
import {Card} from "@material-ui/core"

class DataViz extends React.Component{
    render(){
        return(
            <div>
                <Card variant="elevation" elevation={1} id="dataviz" className="stats-item">
                <Card variant="elevation" elevation={5} className="stats-item-header">Visualize Your Daily Progress</Card>


                </Card>
            </div>
            
        )
    }
}

export default DataViz;