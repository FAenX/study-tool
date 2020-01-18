import React from "react"
import {Paper, Card} from "@material-ui/core"
import History from "./History"
import DataViz from "./DataViz"


class TableSettings extends React.Component{
    render(){
        return(
            <div>
                <Card variant="elevation" elevation={1} id="table-settings" className="stats-item">
                <Card variant="elevation" elevation={5} className="stats-item-header">Settings</Card>
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
                    <History 
                        completed={this.props.completed} 
                        days={this.props.days} 
                        date={this.props.date} 
                        day={this.props.day} 
                        month={this.props.month} 
                        year={this.props.year}
                        history={this.props.history}
                    />                    
                    <DataViz />
            </Paper>
        )
    }
}

export default DashBoard;