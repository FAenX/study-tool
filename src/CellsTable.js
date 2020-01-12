import React from 'react';
import Cell from "./Cell";
import Timer from "./Timer";
import {Paper, Card, Button} from "@material-ui/core"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

class ResetButton extends React.Component{
	handleReset=(event)=>{
		event.preventDefault()
		localStorage.removeItem("completed")
	}
	render(){
		return(
			<Button onClick={this.handleReset}>reset</Button>
		)
	}
}

class Table extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cells: 20,
			active: false,
			activeID: "",			
			
		}
		
	};

	//update state from cell click
	handleCellClick = (data)=> {  
		this.setState((prevState, props)=>({
		  activeID: data.activeID,
		  active: true,
		}))		
		
	} 	

	handleOnComplete=()=>{
		this.setState({
			active: false
		})
		this.props.addToCompleted(this.state.activeID)
		alert("Completed")
	}


	render (){
		let progress;

		if (this.state.active === true){
			progress = <Timer completed={this.handleOnComplete}/>
		} 

		return (
			<div  className="flex-col">  	
							
          		<Paper variant="elevation" elevation={5} className="flex-row pomodoro-table"> 
				  <Card variant="elevation" elevation={3} className="table-header flex-row">
					  
					  
					  	<Button>Refresh</Button>
						<ResetButton />
					
					</Card>
					{makeList(this.state.cells).map(i => {
						return <Cell number={i} key={i} clicked={this.handleCellClick} 
						active={this.state.active} completed={this.props.completed}/>
					})}
				</Paper>
					{progress}	
        	</div>
			);
	};
}

export default Table;