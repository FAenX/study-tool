import React from 'react';
import Cells from "./Cells";
import Progress from "./ProgressBar";


class Table extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			cells: 20,
			active: false,
			activeID: "",
			completed: [],
			
		}
		
	};
	componentDidMount =()=>{
		this.setState({
			completed: JSON.parse(localStorage.getItem("completed"))

		})
	}

	componentDidUpdate=()=>{
		localStorage.setItem("completed", JSON.stringify(this.state.completed))
	}

	//add completed cell to list
	addToCompleted=(active)=>{	
		let completed = this.state.completed
		try{
			completed[active] = active	
		}catch{
			completed = [active]
		}        
		this.setState((prevState, props)=>({
		  completed,
		}))
	}

	// make array from this.state.cells
	makeList = () => {
		let list = [];
		for (let i = 0; i < this.state.cells; i++){
			list.push(i);
		}
		return list;
	}

	//update state from cell click
	handleCellClick = (data)=> {  
		this.setState((prevState, props)=>({
		  activeID: data.activeID,
		  active: true,
		}))		
		
	} 	

	handleOnComplete=()=>{
		this.setState({
			active: false
		})
		this.addToCompleted(this.state.activeID)
		alert("Completed")
	}


	render (){
		let progress;

		if (this.state.active === true){
			progress = <Progress completed={this.handleOnComplete}/>
		} 

		return (
			<div>  				
          		<div className="flex-row-container"  id="pomodoro-table"> 
					{this.makeList().map(i => {
						return <Cells number={i} key={i} clicked={this.handleCellClick} 
						active={this.state.active} completed={this.state.completed}/>
					})}
				</div>
					{progress}	
        	</div>
			);
	};
}

export default Table;