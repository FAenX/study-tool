import React from "react";

class Cells extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			clicked: false,
            color: 'grey',
			progress: 0,
			activeID: ""
		};
	};

	handleClick = (event) => {
		event.preventDefault()
		if (this.state.clicked === true || this.props.active === true){
			return
		}else if (this.state.clicked === false && this.props.active === false){
			this.setState({
				clicked: true,
				color: 'green',
				activeID: event.target.id
			});	
			setTimeout(()=>{this.props.progressBar(this.state)}, 1500)
			}	
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