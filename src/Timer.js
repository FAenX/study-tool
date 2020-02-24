import React from "react";
import  { CircularProgress  } from "@material-ui/core"
import moment from "moment"
import "./Timer.scss"


class Timer extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			progress: null,
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
			console.log(moment().format("LTS"))
		}
		}catch{
			//
		}

		if(this.props.timer)			
		{
			
			const remTime = moment(this.props.timer).add(0.5, "hours") - moment()
			const countDown = moment(remTime).format("mm")
			 const endTime = moment().add(remTime).format("LT")
		
				this.setState({
					progress: 10,
					countDown,
					endTime,
				});

			//progress percentage report	!!!!!!!!!!		
			
		}else{
			this.setState({
				progress: false,
			})
		}
		this.setState({
			time: moment().format("LTS")
		})
	}

	render(){
		let progress;
		
		if(this.state.progress && this.state.progress <= 90){
			progress = <CircularProgress  className="circular-progress" variant="indeterminate"  color="primary" />
		}else if(this.state.progress && this.state.progress > 90){
			progress = <CircularProgress  className="circular-progress" variant="indeterminate"  color="secondary" />
		}else {
			progress = <div>===></div>
		}		
		
		return(
			<div id="progress-bar">
				<div>{this.state.endTime} </div>
				<div>00:00:{this.state.countDown} Mins remaining</div>
				<div>{progress}</div>
				
			</div>
            
			
		)
	}
};

export default Timer;
