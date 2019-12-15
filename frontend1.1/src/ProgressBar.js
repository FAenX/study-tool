import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from "react-bootstrap";

class Progress extends React.Component {

	render(){
		return(
            <ProgressBar now={this.props.percentage} label={`${this.props.percentage}%`}/>
		)
	}
};

export default Progress;
