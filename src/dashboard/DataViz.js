import React from "react"
import {Card, IconButton, Toolbar} from "@material-ui/core"
import LineChart from "./LineChart"
import {Refresh, Add, Remove} from "@material-ui/icons"
import "./DataViz.scss"

class DataViz extends React.Component{
    constructor(props){
		super(props)
		this.state={
            refresh: false,
            historyLength: 7,
        }
    }
    
    refresh =()=>{
        this.setState({refresh: true})
		setTimeout(()=>{
			this.setState({refresh: false})
		}, 1000)
    }
    
    moreLineChartHistory=()=>{
        this.setState({historyLength: this.state.historyLength+1}) 
    }
    lessLineChartHistory=()=>{
        this.setState({historyLength: this.state.historyLength-1}) 
    }


    render(){
        const history = JSON.parse(localStorage.getItem("history")) 
        
        return(
           
                <Card variant="outlined" id="dataviz" className="stats-item">
                <Toolbar>
                    <div> Line Chart</div>
                       
                
                    <IconButton onClick={this.refresh}>
                        <Refresh />
                    </IconButton>
                    <IconButton onClick={this.moreLineChartHistory}>
                        <Add />
                    </IconButton>
                    <IconButton onClick={this.lessLineChartHistory}>
                        <Remove />
                    </IconButton>
                    
                </Toolbar>

                <LineChart
                    historyLength={this.state.historyLength} 
                    completed={this.props.completed}
                    refresh={this.state.refresh}
                    history={history}
                />
                </Card>
            
            
        )
    }
}

export default DataViz;