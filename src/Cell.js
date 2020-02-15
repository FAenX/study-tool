import React from "react";
import {Card} from "@material-ui/core"
import clsx from 'clsx';
import moment from "moment"

class Cell extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			done: false,
		};
	};



	handleClick = (event) => {
		event.preventDefault()
		if (this.state.done === true || this.props.tableActive === true){
			return
		}else if (this.state.done === false && this.props.tableActive === false){
			const now = moment()
			
			this.props.clickHandler(this.props.number, now)	
			
		}		
		
	}
		

	render(){
		const done=()=>{
			if (this.props.completed!==null && this.props.completed.includes(this.props.number)){
				return true
			}
			
			return false
		}
		const normal =()=>{
			if (this.props.completed==null) {
				return true
			}else if (this.props.completed!==null && !this.props.completed.includes(this.props.number)){
				return true
			}
			
			return false
		}
		const active=()=>{
			if (this.props.activeCell === this.props.number){
				return true
			}
			return false
		}
		
		

		return (
			<div className="card">
				<Card 
					variant="elevation" 
					elevation={5} 
					id={this.props.number} 
					className = {clsx('p-1',{
						"done":done(),
						"active": active(),
						"normal": normal(),

					})} 
					onClick={this.handleClick} 
					
				>
					 
				</Card>
				
				{this.props.number} 
			</div>
		)	
	};
};

export default Cell;