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
                        now={this.props.now}
                        completed={this.props.completed}
                        history={this.props.history}
                    />                    
                    <DataViz 
                        completed={this.props.completed} 
                        history={this.props.history}
                    />
            </Paper>
        )
    }
}

export default DashBoard;