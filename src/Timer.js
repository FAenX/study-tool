import React from "react";
import  { LinearProgress  } from "@material-ui/core"
import moment from "moment"
import "./Timer.scss"


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


	updateClock=()=>{
		try{
			if(moment(this.props.timer).add(30, "minutes") < moment() )
		{
			this.props.completed();
		}
		}catch{
			//
		}

		

		if(this.props.timer)			
		{
			
			const remTime = moment(this.props.timer).add(0.5, "hours") - moment()
			const countDown = moment(remTime).format("mm:ss")
			const endTime = moment().add(remTime).format("LT")

			//progress percentage report	!!!!!!!!!!	
			let progress = 100-(moment(remTime).format("mm") * 100)/30
		
				this.setState({
					progress,
					countDown,
					endTime,
				});

			
			
			
			
		}else{
			this.setState({
				progress: 0,
			})
		}
		
		// if(moment(this.state.countDown))
		this.setState({
			time: moment().format("LTS")
		})
	}

	render(){
		let progress;
		
		if(this.state.progress && this.state.progress <= 90){
			progress = <LinearProgress  
							className="linear-progress" 
							variant="determinate"  
							color="primary"
							value={this.state.progress} 
						/>
		}else if(this.state.progress && this.state.progress > 90){
			progress = <LinearProgress
							className="linear-progress" 
							variant="determinate"  
							color="secondary" 
							value={this.state.progress} 
						/>
		}else {
			progress = <LinearProgress
							className="linear-progress" 
							variant="determinate"  
							value={100} 
							color="primary" 
						/>
		}		
		
		return(
			<div id="progress-bar">
				<div>00:{this.state.countDown} Mins remaining</div>
				{/* <div className="circular-progress" > */}
					{/* <div className="circular-progress1"></div> */}
				{/* </div> */}
				{progress}
				
			</div>
            
			
		)
	}
};

export default Timer;
