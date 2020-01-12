import React from "react"
import {Paper, Card} from "@material-ui/core"
import History from "./History"
import DataViz from "./DataViz"


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