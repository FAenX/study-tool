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
    const months = {
      0: "January"
    }

    const days = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday"
    }
    const today = new Date()
    const date = today.getDate()
    const day = days[today.getDay()]
    const month= months[today.getMonth()]
    const year = today.getFullYear()

    return (
      <div className="App flex-col">
        <div className="App-header flex-col"> 
        Pomodoro Study Tool
        </div>
      <div className="main-app-wrapper flex-col"> 
        <div className="pomodoro flex-row">
          <div className="table-wrapper">
            <CellTable 
              addToCompleted={this.addToCompleted} 
              completed={this.state.completed}
            />
          </div>           
            <div className="stats-wrapper flex-col">
              <DashBoard 
                done={this.state.completed} 
                completed={this.state.completed}
                days={days} date={date} day={day} month={month} year={year}
              />
            </div>
          </div>           
            
            <div id="kanban" className="flex-col">kanban</div>
      </div>
      
      </div>
    );
  };
};

export default App;
