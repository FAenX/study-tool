import React from "react";
import  { LinearProgress, Card } from "@material-ui/core"
import moment from "moment"


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
			
			const remTime = moment(this.props.timer).add(30, "minutes") - moment()
			const countDown = moment(remTime).format("mm.ss")
		
				this.setState({
					progress: 10,
					countDown,
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
			progress = <LinearProgress  className="linear-progress" variant="indeterminate"  color="primary" />
		}else if(this.state.progress && this.state.progress > 90){
			progress = <LinearProgress  variant="indeterminate"  color="secondary" />
		}else {
			progress = <div>===></div>
		}		
		
		return(
			<div id="progress-bar">
				{this.state.countDown} minutes remaining
				<Card >{progress}</Card>
			</div>
            
			
		)
	}
};

export default Timer;
