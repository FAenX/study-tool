import React from 'react';
import Cell from "./Cell";
import Timer from "./Timer";
import {Paper, Button, Toolbar} from "@material-ui/core"
import "./CellsTable.scss"

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

class ResetButton extends React.Component{
	
	render(){
		return(
			<Button variant="outlined" color="primary" onClick={this.props.handleTableReset}>reset</Button>
		)
	}
}

class Table extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			cells: 20,
			active: false,
			cellID: "",	
			timer: ""		
			
		}
		
	};

	//update state from cell click
	handleCellClick = (ID, then)=> {  
		this.setState({
		  cellID: ID,
		  active: true,
		  timer: then
		})
	} 	

	handleOnComplete=()=>{
		this.props.addToCompleted(this.state.cellID)
		this.setState({
			active: false,
			cellID: false,
			timer: false
		})

		

		alert("Completed")
	}


	render (){

		return (		
				  <Paper 
					  variant="outlined" 					  
					  className="pomodoro-table"
					> 
					
				  	<Toolbar>					  
					  	<Button variant="outlined" color="primary">Refresh</Button>
						<ResetButton handleTableReset={this.props.handleTableReset}/>					
					</Toolbar>
					<div className="cells">
						{makeList(this.state.cells).map(i => {
							return <Cell number={i} 
									activeCell={this.state.cellID}
									key={i} 
									clickHandler={this.handleCellClick} 
									tableActive={this.state.active} 
									completed={this.props.completed}
								/>
						})}
					</div>
					<Timer completed={this.handleOnComplete} active={this.state.active} timer={this.state.timer}/>

				</Paper>
			);
	};
}

export default Table;