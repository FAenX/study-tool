import React from "react";
import {Card} from "@material-ui/core"

class Cell extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			clicked: false,
            color: 'grey',
			ID: "",
			active: "false"
			
		};
	};

	componentDidMount=()=>{
		
		this.setState({
			ID: this.props.number,
		})
	}

	componentDidUpdate=()=>{
		this.checkDone()		
	}

	checkDone=()=>{
		try{
			if (this.props.completed.includes(this.props.number)){
				this.setState({
					clicked: true,
					color: "maroon",
					active: false,
				})
			}else if (this.state.active === true){
				this.setState({
					color: 'rgb(255, 102, 0)',
				})
			}else{
				this.setState({
					clicked: false,
					color: "grey"
				})

			}
			
		}catch{
			//
		}
	}

	handleClick = (event) => {
		event.preventDefault()
		if (this.state.clicked === true || this.props.tableActive === true){
			return
		}else if (this.state.clicked === false && this.props.tableActive === false){
			this.setState({
				active: true,
			});	
			
		}

		//update table state
		this.props.clickHandler(this.state.ID)	
		
	}
		

	render(){
		

		return (
			<div className="flex-col">
				<Card 
					variant="elevation" 
					elevation={5} 
					id={this.props.number} 
					className = 'p-1 flex-col' 
					onClick={this.handleClick} 
					style={{backgroundColor: this.state.color}}
				>
					 
				</Card>
				{this.props.number} 
			</div>
		)	
	};
};

export default Cell;