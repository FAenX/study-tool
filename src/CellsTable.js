import React from 'react';
import Cell from "./Cell";
import Progress from "./ProgressBar";
import {Paper, Card, Button} from "@material-ui/core"


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
			completed: [],
			
		}
		
	};
	componentDidMount =()=>{
		this.setState({
			completed: JSON.parse(localStorage.getItem("completed"))

		})
	}

	componentDidUpdate=()=>{
		localStorage.setItem("completed", JSON.stringify(this.state.completed))
	}

	//add completed cell to list
	addToCompleted=(active)=>{	
		let completed = this.state.completed
		try{
			completed[active] = active	
		}catch{
			completed = [active]
		}        
		this.setState((prevState, props)=>({
		  completed,
		}))
	}

	// make array from this.state.cells
	makeList = () => {
		let list = [];
		for (let i = 0; i < this.state.cells; i++){
			list.push(i);
		}
		return list;
	}

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
		this.addToCompleted(this.state.activeID)
		alert("Completed")
	}


	render (){
		let progress;

		if (this.state.active === true){
			progress = <Progress completed={this.handleOnComplete}/>
		} 

		return (
			<div  className="flex-col">  	
							
          		<Paper variant="elevation" elevation={5} className="flex-row pomodoro-table"> 
				  <Card variant="elevation" elevation={3} className="table-header flex-row">
					  
					  
					  	<Button>Refresh</Button>
						<ResetButton />
					
					</Card>
					{this.makeList().map(i => {
						return <Cell number={i} key={i} clicked={this.handleCellClick} 
						active={this.state.active} completed={this.state.completed}/>
					})}
				</Paper>
					{progress}	
        	</div>
			);
	};
}

export default Table;