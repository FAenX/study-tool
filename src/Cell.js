import React from "react";
import {Card} from "@material-ui/core"

class Cell extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			clicked: false,
            color: 'grey',
			activeID: "",
			
		};
	};

	componentDidMount=()=>{
		
		this.setState({
			activeID: this.props.number,
		})
	}

	handleClick = (event) => {
		event.preventDefault()
		if (this.state.clicked === true || this.props.active === true){
			return
		}else if (this.state.clicked === false && this.props.active === false){
			this.setState((prevState, props)=>({
				clicked: true,
				color: 'rgb(255, 102, 0)',
			}));	
			
		}

		//update table state
		this.props.clicked(this.state)	
		
	}
		

	render(){

		try{
			if (this.props.completed.includes(this.props.number)){
				this.setState({
					clicked: true,
					color: "maroon"
				})
			}
			
		}catch{
			//
		}

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