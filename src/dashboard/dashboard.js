import React from "react"
import {Paper, Card} from "@material-ui/core"

class History extends React.Component{
    render(){
        
        
        return(
            <div>
                <Card variant="elevation" elevation={1} id="history" className="stats-item">
                <Card variant="elevation" elevation={5} className="stats-item-header">Study history</Card>
                    {this.props.done} cycles
                </Card>
            </div>
            
            
        )
    }
}

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

class TableSettings extends React.Component{
    render(){
        return(
            <div>
                <Card variant="elevation" elevation={1} id="table-settings" className="stats-item">
                <Card variant="elevation" elevation={5} className="stats-item-header">Make adjustments to the table</Card>


                </Card>
            </div>
            
        )
    }
}



class DashBoard extends React.Component{

    render(){
        return(
            <Paper id="dashboard" variant="outlined" >                
                    <TableSettings />                   
                    <History />                    
                    <DataViz />
            </Paper>
        )
    }
}

export default DashBoard;