import React from "react"
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
            <div id="dashboard">                       
                                     
                    <DataViz 
                        completed={this.props.completed} 
                    />
            </div>
        )
    }
}

export default DashBoard;