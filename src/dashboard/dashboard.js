import React from "react"
import {Paper, Card, Toolbar} from "@material-ui/core"
import History from "./History"
import DataViz from "./DataViz"


class TableSettings extends React.Component{
    render(){
        return(
                <Card 
                    variant="outlined" 
                    elevation={1} 
                    id="table-settings" 
                    className="stats-item"
                >
                <Toolbar className="stats-item-header">Settings</Toolbar>
                </Card>
            
        )
    }
}



class DashBoard extends React.Component{
    
    render(){
        return(
            <Paper id="dashboard" variant="outlined" >                       
                    <History 
                        completed={this.props.completed} 
                        days={this.props.days} 
                        date={this.props.date} 
                        day={this.props.day} 
                        month={this.props.month} 
                        year={this.props.year}
                        history={this.props.history}
                    />                    
                    <DataViz 
                        day={this.props.day} 
                        completed={this.props.completed} 
                        days={this.props.days} 
                        history={this.props.history}
                    />
            </Paper>
        )
    }
}

export default DashBoard;