import React from 'react';
import Cells from "./Cells";
import Progress from "./ProgressBar";


class Table extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			cells: 20,
			progressPercentage: 0,
			progressID: "",
			active: false
		}
		
	};

	// make array from this.state.cells
	makeList = () => {
		var list = [];
		for (let i = 0; i < this.state.cells; i++){
			list.push(i);
		}
		return list;
	}

	//start progressbar on cell click
	handleCellClick = (data)=> {
		console.log(data)
		
		this.setState({
		  progressID: data.activeID,
		  active: true,
		  progressPercentage: 0
		})	
		this.progressBar()
	} 

	progressBar =()=> {
		setInterval(this.frame, 1000)
		let i = 0;
		this.frame =()=> {
			console.log('frame' + i);			
			clearInterval(this.timer)			
			this.setState({
				progressPercentage: i,
			})
			i+=1;
			this.setState({progressPercentage: i});
			}
	}
	
			
	
	render (){
		

		return (
			<div>  				
          		<div className="flex-row-container"  id="pomodoro-table" style={{display: this.props.display}}> 
					{this.makeList().map(i => {
						return <Cells number={i} key={i} progressBar={this.handleCellClick} 
								progressPercentage={this.state.progressPercentage} active={this.state.active}/>
					})}
				</div>
					<Progress percentage = {this.state.progressPercentage} />	
        	</div>
			);
	};
}

export default Table;