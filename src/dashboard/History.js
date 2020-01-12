import React from "react"
import {Card} from "@material-ui/core"

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

    componentDidMount=()=>{
        const day = this.props.day
        const history = this.props.history
        console.log(history)
        
    }

    render(){
        

        try{
			if ((this.props.id)){
				
			}
			
		}catch{
			//
		}
        
        return(
            <div className="flex-col">
				<Card 
					variant="elevation" 
					elevation={5} 
					className = 'p-1 flex-col' 
					style={{backgroundColor: this.state.color}}
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
                <div id="date" className="flex-col">
                    <div className="day">{this.props.day}</div>
                    <div id="full-date"> {this.props.month} {this.props.date} {this.props.year} </div>
                </div>
            </Card>    
        )
    }
}

class Day extends React.Component{
    render(){
        
        
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
                                    history={this.props.history} 
                                    key={i}
                                    day={this.props.day}
                                    
                                    
                                    
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
            <div id="days" className="flex-col">
            {
            Object.keys(this.props.days).map(i=>{
                return <Day key={i}
                            day={this.props.days[i]}
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
            <div>
                <Card variant="elevation" elevation={1} id="history" className="stats-item">
                    <Header day={this.props.day} date={this.props.date} month={this.props.month} year={this.props.year} />  
                    <Body 
                        days={this.props.days}
                        day={this.props.day} 
                        date={this.props.date}
                        month={this.props.month}
                        year={this.props.year}
                        completed={this.props.completed}
                        history={this.props.history}
                    />      
                </Card>
            </div>
            
            
        )
    }
}

export default History;