import React from "react"
import {Card} from "@material-ui/core"
import clsx from 'clsx';
import moment from "moment"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
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

class Header extends React.Component{
    
    render(){
        const day = this.props.now.format("dddd")
        const date = this.props.now.format("DD/MM/YYYY")
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

class Day extends React.Component{
    render(){
        const chooseToday=()=>{
            if (this.props.day === this.props.today){
                return this.props.completed
            }
            return this.props.history
        }
       
        return(
                <div 
                    className="days-day"
                >
                <div 
                    className="day" 
                >
                {this.props.day}
                
                </div>
                <div className="daily-burn">
                    {makeList(20).map(i => {
                        return <Cell 
                                    id={i}
                                    key={i}
                                    day={this.props.day}
                                    history={chooseToday()}
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
            historyObject: {},  
        }
    }
    componentDidMount=()=>{
         
    this.setState({
        historyObject: this.makeHistoryObject(),
    })
    }

    makeHistoryObject = ()=>{
        let historyObject = {};
        
        for (let i = this.state.historyLength; i > 0; i--){
            historyObject[moment().subtract(i, 'days').format("dddd")] 
            = (moment().subtract(i, 'days').format("YYYYMMMMDD"))
            console.log(moment().format("YYYY/MMMM/DD"))
            //console.log(i)
        }
        return historyObject
    }; 


    render(){ 
    
        return(
            
            <div id="days">
            {
            Object.keys(this.state.historyObject).map(i=>{
                return <Day key={i}
                            today={moment().format('dddd')}
                            day={i}
                            completed={this.props.completed}
                            history={this.props.history}
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
                <Header 
                    now={this.props.now}
                />  
                <Body 
                    now={this.props.now}
                    history={this.props.history}
                    completed={this.props.completed}
                />      
            </Card>
           
            
            
        )
    }
}

export default History;