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
	
	render(){
		return(
			<Button onClick={this.props.handleTableReset}>reset</Button>
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
			
		}
		
	};

	//update state from cell click
	handleCellClick = (ID)=> {  
		this.setState({
		  cellID: ID,
		  active: true,
		})	
		
	} 	

	handleOnComplete=()=>{
		this.setState({
			active: false
		})
		this.props.addToCompleted(this.state.cellID)
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
						<ResetButton handleTableReset={this.props.handleTableReset}/>					
					</Card>
					{makeList(this.state.cells).map(i => {
						return <Cell number={i} key={i} clickHandler={this.handleCellClick} 
						tableActive={this.state.active} completed={this.props.completed}/>
					})}
				</Paper>
					{progress}	
        	</div>
			);
	};
}

export default Table;