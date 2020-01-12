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
        const months = {
            0: "January"
        }

        const days = {
            0: "Monday",
            1: "Tuesday",
            2: "Wednesday",
            3: "Thursday",
            4: "Friday",
            5: "Saturday",
            6: "Sunday"
        }
        const today = new Date()
        const date = today.getDate()
        const day = days[today.getDay()]
        const month= months[today.getMonth()]
        const year = today.getFullYear()

        return(
            <div>
                <Card variant="elevation" elevation={1} id="history" className="stats-item">
                    <Header day={day} date={date} month={month} year={year} />  
                    <Body done={this.props.done} day={day} days={days}/>      
                </Card>
            </div>
            
            
        )
    }
}

export default History;