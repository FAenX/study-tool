import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"


import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
      
    }
  }

  render(){
    return (
      <div className="App flex-col">
        <div className="App-header flex-col"> 
        Pomodoro Study Tool
        </div>
      <div className="main-app-wrapper flex-row">             
            <div className="table-wrapper"><CellTable />  </div> 
           
            <div className="stats-wrapper flex-col"><DashBoard /></div>
      </div>
      </div>
    );
  };
};

export default App;
