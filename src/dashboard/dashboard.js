import React from "react"
import {Paper} from "@material-ui/core"
import History from "./History"
import DataViz from "./DataViz"
import "./Dashboard.scss"


// class TableSettings extends React.Component{
//     render(){
//         return(
//                 <Card 
//                     variant="outlined" 
//                     elevation={1} 
//                     id="table-settings" 
//                     className="stats-item"
//                 >
//                 <Toolbar className="stats-item-header">Settings</Toolbar>
//                 </Card>
            
//         )
//     }
// }



class DashBoard extends React.Component{
    
    
    render(){
        return(
            <Paper id="dashboard" variant="outlined" >                       
                    <History 
                        completed={this.props.completed}
                    />                    
                    <DataViz 
                        completed={this.props.completed} 
                    />
            </Paper>
        )
    }
}

export default DashBoard;