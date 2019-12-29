import React from 'react';
import CellTable from "./CellsTable"

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
      
    }
  }

  
  
  render(){
    return (
      <div className="App">
        <div className="App-header"> </div>
      <div className="flex-column-container">             
            <CellTable />   
      </div>
      </div>
    );
  };
};

export default App;
