import React from "react"
import {Card} from "@material-ui/core"
import clsx from 'clsx';

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
    render(){ 
        
        const historyLength = 6;    
        const now = this.props.now;
        
        let historyKeysArray = ()=>{
            let arr = [];
            for (let i = historyLength; i > 0; i--){
                arr.push(now.subtract(i, 'days').format("dddd"))
            }
            return arr
        }; 

        

       const days =historyKeysArray()
        
        
        return(
            
            <div id="days">
            {
            historyKeysArray().map(i=>{
                return <Day key={i}
                            today={now.format('dddd')}
                            day={days[i]}
                            completed={this.props.completed}
                            history={this.props.history[days[i]]}
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