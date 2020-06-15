import React, {useEffect, useState} from "react"
import {Card, IconButton, Toolbar} from "@material-ui/core"
import LineChart from "./LineChart"
import {Refresh, Add, Remove} from "@material-ui/icons"
import "./DataViz.scss"

export function DataViz(props) {
    const [refresh, setRefresh]=useState(false)
    const [historyLength, setHistoryLength] = useState(7)
	
    
    const handleRefresh =()=>{
        setRefresh(true)
        setTimeout(()=>{
            setRefresh(false)
        }, 1000)
    }
    const moreButton=()=>{
        setHistoryLength(historyLength+1)
    }

    const lessButton=()=>{
        setHistoryLength(historyLength-1)
    }  
    return(        
        <Card variant="outlined" className="dataviz">
            <Toolbar>
                <div> Line Chart</div>                       
            
                <IconButton onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
                <IconButton onClick={moreButton}>
                    <Add />
                </IconButton>
                <IconButton onClick={lessButton}>
                    <Remove />
                </IconButton>
                
            </Toolbar>

            <LineChart
                historyLength={historyLength} 
                completed={props.completed}
                refresh={refresh}
                history={props.history}
            />
        </Card>
    )
}


export default DataViz;