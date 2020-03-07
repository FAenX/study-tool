import React from "react";
import  { LinearProgress  } from "@material-ui/core"
import moment from "moment"
import "./Timer.scss"
import PropTypes from "prop-types"


const Progress =(props)=>{
	if(props.progress <= 90){
		return 	<LinearProgress  
						className="linear-progress" 
						variant="determinate"  
						color="primary"
						value={props.progress} 
					/>
	}else if(props.progress > 90){
		return <LinearProgress
						className="linear-progress" 
						variant="determinate"  
						color="secondary" 
						value={props.progress} 
					/>
	}else {
		return  <LinearProgress
						className="linear-progress" 
						variant="determinate"  
						value={100} 
						color="primary" 
					/>
	}		
}

class Timer extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			progress: 0,
			time: 0,
			countDown: 0
		}
	}

	componentDidMount =()=>{
		this.intervalID = setInterval(
			()=> this.updateClock(), 1000
		);
	};

	componentWillUnmount=()=>{
		clearInterval(this.intervalID)
	}

	updateClock=()=>{
		
		if(moment(this.props.timer).add(30, "minutes") < moment() )
		{
			this.props.handleOnComplete();
			this.setState({
				progress: 0,
				countDown: 0,
			});
			
		}
		
		
		const remTime = moment(this.props.timer).add(0.5, "hours") - moment()
		const countDown = moment(remTime).format("mm:ss")
		//progress percentage report	!!!!!!!!!!	
		let progress = 100-(moment(remTime).format("mm") * 100)/30
		this.setState({
			progress,
			countDown,
		});
	}

	
	render(){
		return(
			<div id="progress-bar">
				<div>00:{this.state.countDown} Mins remaining</div>
				{/* <div className="circular-progress" > */}
					{/* <div className="circular-progress1"></div> */}
				{/* </div> */}
				<Progress progress={this.state.progress}/>
				
			</div>
            
			
		)
	
	};
}

Timer.propTypes={
	timer: PropTypes.any.isRequired,
	handleOnComplete: PropTypes.func.isRequired
}

Progress.propTypes={
	progress: PropTypes.number.isRequired
}

export default Timer;
