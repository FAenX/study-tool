import React from "react";
import  { LinearProgress } from "@material-ui/core"


class Progress extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			seconds: 0,
		}
	}

	componentDidMount =()=>{
		this.timerID = setInterval(
			()=>this.tick(),
			//18000
			1000
		)
	}

	tick =()=>{
		if (this.state.seconds <= 100){
			this.setState((prevState, props)=>({
				seconds: prevState.seconds + 1

			}))
		}else{
			clearInterval(this.timerID);
			this.props.completed()
		}
	}

	render(){
		let progress;

		if(this.state.seconds <= 90){
			progress = <LinearProgress  variant="determinate"  value={this.state.seconds} color="primary" />
		} else {
			progress = <LinearProgress  variant="determinate"  value={this.state.seconds} color="secondary" />
		}
		return(
            
			<div>{progress}</div>
		)
	}
};

export default Progress;
