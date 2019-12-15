import React from 'react';


class StartButton extends React.Component {
	
	render(){
		return (
			<div className="flex-column-container" id="activity-panel" style={{display: this.props.display}}>
				<div id="start-button" onClick={this.props.action}>
                  	<p>Start</p>
              	</div>
             </div>
		);
	};
}

export default StartButton;