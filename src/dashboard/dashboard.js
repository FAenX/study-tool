import React, {useEffect, useState} from "react"
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



const DashBoard =props=>{   
    return(
        <div id="dashboard">      
                <DataViz 
                    completed={props.completed} 
                />
        </div>
    )

}

export default DashBoard;