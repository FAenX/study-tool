import React from 'react';

class Stats extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString(),
			counter: 0,
			
		}
	};

	componentDidMount (){
		this.intervalID = setInterval(
			()=> this.updateClock(), 1000
			);
	};

	componentWillMount () {
		clearInterval(this.intervalID);
	};

	updateClock(){
		this.setState({
			time: new Date().toLocaleString()
		})
	}


	render(){
		return (
			<div className="flex-column-container" id="stats">
              <div className="stats-item" id="date">
              	<p> The time is {this.state.time}</p>
              </div>
              <div className="stats-item" id="counter"></div>
              <div className="stats-item flex-column-container">
                  <div id="progress-bar">
                      <div className="progress-bar-normal" id="progress"></div>
                  </div>
                  <div id="progress-percentage"></div>              
              </div>
          </div>
			);
	};
};

export default Stats;