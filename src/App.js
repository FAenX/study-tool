import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"


import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
      
    }
  }

  componentDidMount =()=>{
		this.setState({
			completed: JSON.parse(localStorage.getItem("completed"))

		})

	}

	componentDidUpdate=()=>{
		localStorage.setItem("completed", JSON.stringify(this.state.completed))
  }
  

	//add completed cell to list
	addToCompleted=(cell)=>{	
		let completed = this.state.completed
		try{
			completed[cell] = cell
		}catch{
			completed = [cell]
		}        
		this.setState((prevState, props)=>({
		  completed,
		}))
	}

  render(){
    return (
      <div className="App flex-col">
        <div className="App-header flex-col"> 
        Pomodoro Study Tool
        </div>
      <div className="main-app-wrapper flex-row">             
            <div className="table-wrapper"><CellTable addToCompleted={this.addToCompleted} completed={this.state.completed}/></div>           
            <div className="stats-wrapper flex-col"><DashBoard done={this.state.completed}/></div>
      </div>
      </div>
    );
  };
};

export default App;
