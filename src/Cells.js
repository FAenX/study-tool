import React from "react";

class Cells extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			clicked: false,
            color: 'grey',
			activeID: "",
			
		};
	};

	componentDidMount=()=>{
		const completed = JSON.parse(localStorage.getItem("completed"))
		try{
			if (completed.includes(this.props.number)){
				this.setState({
					clicked: true,
					color: "maroon"
				})
			}
			
		}catch{
			//
		}
		
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
				color: 'green',
			}));	
			
		}

		//update table state
		this.props.clicked(this.state)	
		
	}
		

	render(){
		return (
			<div>
				<div id={this.props.number} className = 'p-1' onClick={this.handleClick} 
				style={{backgroundColor: this.state.color}}>
					 {this.props.number} 
				</div>
			</div>
		)	
	};
};

export default Cells;