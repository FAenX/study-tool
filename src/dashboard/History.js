import React from "react"
import {Card} from "@material-ui/core"
import { grey, red } from "@material-ui/core/colors";

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

class Cell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            color:"grey"        
        }
    }

   
   

    render(){  
        const cellColor=()=>{
            if(this.props.id !== this.props.day)
            if (this.props.history!==null &&
                this.props.history !== undefined && 
                this.props.history.includes(this.props.id)){
                 return "maroon"
                }
                return "grey"
            }
    
        
        return(
            <div className="">
				<Card 
					variant="elevation" 
					elevation={5} 
					className = 'p-1 ' 
					style={{backgroundColor: cellColor()}}
				>
					 
				</Card>
				
			</div>
        )
    }
}

class Header extends React.Component{
    render(){
        return(
            <Card variant="elevation" elevation={5} className="stats-item-header">
                Study/Work history
                <div id="date" className="">
                    <div className="day">{this.props.day}</div>
                    <div id="full-date"> {this.props.month} {this.props.date} {this.props.year} </div>
                </div>
            </Card>    
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
                    className="flex-row days-day"
                >
                <div 
                    className="day" 
                >
                {this.props.day}
                
                </div>
                <div className="daily-burnout flex-row">
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
        return(
            <div id="days" className="">
            {
            Object.keys(this.props.days).map(i=>{
                return <Day key={i}
                            today={this.props.day}
                            day={this.props.days[i]}
                            completed={this.props.completed}
                            history={this.props.history[this.props.days[i]]}
                        />              
            })}            
            </div>
        )
    }
}

class History extends React.Component{
    render(){         

        return(
            <div>
                <Card variant="elevation" elevation={1} id="history" className="stats-item">
                    <Header 
                        day={this.props.day} 
                        date={this.props.date} 
                        month={this.props.month} 
                        year={this.props.year} 
                    />  
                    <Body 
                        days={this.props.days}
                        day={this.props.day} 
                        date={this.props.date}
                        month={this.props.month}
                        year={this.props.year}
                        history={this.props.history}
                        completed={this.props.completed}
                    />      
                </Card>
            </div>
            
            
        )
    }
}

export default History;