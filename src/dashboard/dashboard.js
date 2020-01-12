import React from "react"
import {Paper, ListItem, Card} from "@material-ui/core"

class History extends React.Component{
    render(){
        const done = JSON.parse(localStorage.getItem("completed")).length
        
        return(
            <div>
                <div className="stats-item-header">Study history</div>
                <Card variant="elevation" id="history" className="stats-item">
                    
                    {done} cycles
                
                </Card>
            </div>
            
            
        )
    }
}

class DataViz extends React.Component{
    render(){
        return(
            <div>
                <div className="stats-item-header">Visualize Your Daily Progress</div>
                <Card variant="elevation" id="dataviz" className="stats-item">
               
                </Card>
            </div>
            
        )
    }
}

class TableSettings extends React.Component{
    render(){
        return(
            <div>
                <div className="stats-item-header">Make adjustments to the table</div>
                <Card variant="elevation" id="table-settings" className="stats-item">
                
                </Card>
            </div>
            
        )
    }
}



class DashBoard extends React.Component{

    render(){
        return(
            <Paper id="dashboard" variant="elevation" elevation={5}>
                
                    <TableSettings />
                   
                    <History />
                    
                    <DataViz />
                    
                

            </Paper>
        )
    }
}

export default DashBoard;