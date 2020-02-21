import React from "react"
import {Card, IconButton, Toolbar} from "@material-ui/core"
import {Refresh} from "@material-ui/icons"
import clsx from 'clsx';
import moment from "moment"
import "./History.scss"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
           
        }
    }
    componentDidMount=()=>{
        this.setState({
            dateTime: moment().format("DD MMMM YYYY")
        })
        this.intervalID = setInterval(
			()=> this.updateClock(), 1000
		);
    }
    updateClock=()=>{
        this.setState({
            date: moment().format("DD MMMM YYYY"),
            time: moment().format("LT")
        })
    }

    render(){
        const day = moment().format("dddd")
        
        
        return(
            <Toolbar>
                Study/Work history
                <div id="date" className="">
                    <div id="time"> {this.state.time}</div>
                    <div id="day">{day}</div>
                    <div id="full-date"> {this.state.date}</div>
                </div>
            </Toolbar>    
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
        let completed = this.props.completed
        try{
            if (this.props.day === this.props.today && 
                history.length < completed.length)
            
            {
                history = completed
            }
        }catch{
            //
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
            historyLength: 7, 
            historyKeysArr: [],
            days: []
            
        }
    }
    componentDidMount=()=>{         
        this.makeHistoryKeysArr()
    }    

    makeHistoryKeysArr = ()=>{
		let days = []
        let historyKeysArr = [];
        for (let i = 0; i <= this.state.historyLength; i++){
            historyKeysArr.push(moment().subtract(i, 'days').format("YYYYMMMMDD"));
			days.push(moment().subtract(i, 'days').format("dddd"))
        }
		
	   
		this.setState({
			historyKeysArr,
			days,
		})
    }; 

    makeHistory =(dayKey)=>{
        const history = JSON.parse(localStorage.getItem("history"))
        
        if (history && this.state.historyKeysArr.length > 0)
            {
                try{
                    for (let i=0; i<=this.state.historyLength; i++)
                    {
                        if (history[i].day === dayKey)
                        {
                            return history[i].data
                        }
                    }
                }catch{
                    for (let i=0; i<history.length; i++)
                    {
                        if (history[i].day === dayKey)
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
           
               
            {
            this.state.historyKeysArr.map(i=>{
                return <Day key={i}
                            today={moment().format('dddd')}
                            day={this.state.days[this.state.historyKeysArr.indexOf(i)]}
                            completed={i}
                            history={this.makeHistory(i)}
                            refresh={this.props.refresh}
                        />              
            })}  

            <div className={clsx("refreshed",{
                    "display-none": !this.props.refresh
            })}
            >
                refreshed
			</div>
            </div>
        )
    }
}

class History extends React.Component{
    constructor(props){
        super(props)
        this.state={
            refresh: false
        }
    }
    refresh =()=>{
        this.setState({refresh: true})
		setTimeout(()=>{
			this.setState({refresh: false})
		}, 1000)
    }
    
    render(){  
        return(
            
            <Card variant="outlined" id="history" className="stats-item">
                <Header/>
                <Body 
                    refresh={this.state.refresh}
                    completed={this.props.completed}
                /> 
                 
		     
            </Card>
        )
    }
}

export default History;