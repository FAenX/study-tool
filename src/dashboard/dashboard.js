import React from "react"
import {Paper, ListItem, Card} from "@material-ui/core"

class History extends React.Component{
    render(){
        const done = JSON.parse(localStorage.getItem("completed"))
        return(
            <Card variant="outlined" id="history" className="stats-item">
                <div className="stats-item-header">Study history</div>
                <ListItem>{done} cycles</ListItem> 
                
            </Card>
            
        )
    }
}

class DataViz extends React.Component{
    render(){
        return(
            <Card variant="outlined"id="dataviz" className="stats-item">
               <div className="stats-item-header">Visualize Your Daily Progress</div>
            </Card>
        )
    }
}

class TableSettings extends React.Component{
    render(){
        return(
            <Card variant="outlined" id="table-settings" className="stats-item">
                <div className="stats-item-header">Make adjustments to the table</div>
            </Card>
        )
    }
}



class DashBoard extends React.Component{

    render(){
        return(
            <Paper id="dashboard" variant="elevation" elevation={4}>
                
                    <TableSettings />
                   
                    <History />
                    
                    <DataViz />
                    
                

            </Paper>
        )
    }
}

export default DashBoard;