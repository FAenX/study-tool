import React from "react"
import {Card} from "@material-ui/core"
import Cell from "../Cell";

class Header extends React.Component{
    render(){
        return(
            <Card variant="elevation" elevation={5} className="stats-item-header">
                Study/Work history
                <div id="date" className="flex-col">
                    <div className="day">{this.props.day}</div>
                    <div id="full-date"> {this.props.month} {this.props.date} {this.props.year} </div>
                </div>
            </Card>    
        )
    }
}

class Body extends React.Component{
    render(){  
        
        const makeList = () => {
            let list = [];
            for (let i = 0; i < 20; i++){
                list.push(i);
            }
            return list;
        }
        

     
        return(
            <div id="days" className="flex-col">
            {
            Object.keys(this.props.days).map(i=>{
                return <div key={i} id="days-day" className="flex-row">
                        <div className="day" id={this.props.days[i]}>{this.props.days[i]}</div>
                        <div className="daily-burnout flex-row">
                            {makeList().map(i => {
                                return <Cell key={i}/>
                            })}
                        </div>
                    </div>                    
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
                    <Header day={this.props.day} date={this.props.date} month={this.props.month} year={this.props.year} />  
                    <Body done={this.props.done} day={this.props.day} days={this.props.days}/>      
                </Card>
            </div>
            
            
        )
    }
}

export default History;