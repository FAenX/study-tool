import React from "react"
import {Card, IconButton} from "@material-ui/core"
import {Refresh} from "@material-ui/icons"
import clsx from 'clsx';
import moment from "moment"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

class Header extends React.Component{
    render(){
        const day = moment().format("dddd")
        const date = moment().format("DD/MM/YYYY")
        return(
            <div className="stats-item-header">
                Study/Work history
                <div id="date" className="">
                    <div className="day">{day}</div>
                    <div id="full-date"> {date} </div>
                </div>
            </div>    
        )
    }
}

class Cell extends React.Component{    
    render(){  
        const done=()=>{           
			if (
                this.props.history!==null && 
                this.props.history!==undefined &&
                this.props.history.includes(this.props.id))
                {
				return true
			}			
			return false
        }
        const normal =()=>{
            if (this.props.history==null) {
				return true
			}else if (
                this.props.history!==null && 
                this.props.history!==undefined &&
                !this.props.history.includes(this.props.id))
                {
				return true
			}
			
			return false
        }
        
        return(
            <div className="">
				<Card 
					variant="elevation" 
					elevation={5} 
					className = {clsx('p-1',{
                        "done":done(),
                        "normal": normal()
					})} 					
				>
					 
				</Card>
				
			</div>
        )
    }
}

class Day extends React.Component{
    constructor(props){
        super(props)
        this.state={
            history: [],
        }
    }

    componentDidMount=()=>{
        let history = this.props.history;
        if (this.props.day === this.props.today){
            history = this.props.completed
        }
        
       this.setState({
           history,
       })
    }
    
   
    
    render(){
        
        return(
                <div className="days-day">
                <div className="day">
                    {this.props.day}
                </div>
                <div className="daily-burn">
                    {makeList(20).map(i => {
                        return <Cell 
                                    id={i}
                                    key={i}
                                    day={this.props.day}
                                    history={this.state.history}
                                />
                    })}
                </div>
            </div>    
        )
    }
}

class Body extends React.Component{
    constructor(props){
        super(props)
        this.state={
            historyLength: 6, 
            historyObject: {},
            refresh: false,
        }
    }

    componentDidMount=()=>{ 
        
        this.setState({
            historyObject: this.makeHistoryObject(),
        })
    }

    refresh =()=>{
        this.setState({refresh: true})
		setTimeout(()=>{
			this.setState({refresh: false})
		}, 1000)
    }

    makeHistoryObject = ()=>{
        let historyObject = {};
        for (let i =0; i <= this.state.historyLength;  i++){
            historyObject[moment().subtract(i, 'days').format("dddd")] 
            = (moment().subtract(i, 'days').format("YYYYMMMMDD"))
        }
        historyObject[moment().format("dddd")] = moment().format("YYYYMMMMDD")
        
        return historyObject
    }; 

    makeHistory =(dayKey)=>{
        const history = JSON.parse(localStorage.getItem("history"))
        console.log(dayKey)
        
        if (history && Object.keys(this.state.historyObject).length > 0)
            {
                try{
                    for (let i=0; i<=this.state.historyLength; i++)
                    {
                        console.log(history[i])
                        console.log(this.state.historyObject[dayKey])
                        console.log(dayKey)
                        if (history[i].day === this.state.historyObject[dayKey])
                        {
                            console.log(history[i].data)
                            return history[i].data
                        }
                    }
                }catch{
                    for (let i=0; i<history.length; i++)
                    {
                        if (history[i].day === this.state.historyObject[dayKey])
                        {
                            
                            return history[i].data
                        }
                    }
                }
                
            }
    }
    
    render(){ 
        return(
            <div id="days">
                <IconButton onClick={this.refresh}>
                    <Refresh />
                </IconButton>
                <div className={clsx("refreshed",{
                    "display-none": !this.state.refresh
                })}
                >
                        refreshed
			    </div>
		
            {
            Object.keys(this.state.historyObject).map(i=>{
                return <Day key={i}
                            today={moment().format('dddd')}
                            day={i}
                            completed={this.props.completed}
                            history={this.makeHistory(this.state.historyObject[i])}
                        />              
            })}  

            </div>
        )
    }
}

class History extends React.Component{
    render(){  
        return(
            
            <Card variant="outlined" id="history" className="stats-item">
                <Header>  
                     
                </Header>
                <Body 
                    completed={this.props.completed}
                />      
            </Card>
        )
    }
}

export default History;