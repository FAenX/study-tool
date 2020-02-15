import React from "react";
import  { LinearProgress, Card } from "@material-ui/core"
import moment from "moment"


class Timer extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			progress: 0,
			ticks: 0,
			timedOut: false,
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
			this.setState({
				progress: 10,
			})
		}else{
			this.setState({
				progress: 0,
			})
		}
		
		
		this.setState({
			ticks: moment().format("LTS")


		})
	}

	render(){
	

		let progress;

		

		if(this.state.progress <= 90){
			progress = <LinearProgress  className="linear-progress" variant="determinate"  value={this.state.progress} color="primary" />
		} else {
			progress = <LinearProgress  variant="determinate"  value={this.state.progress} color="secondary" />
		}
		return(
            
			<Card id="progress-bar">{progress}</Card>
		)
	}
};

export default Timer;
