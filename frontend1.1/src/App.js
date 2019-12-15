import React from 'react';
import PomodoroTable from './pomodoroTable';
import StartButton from './startButton';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startDisplay: 'flex',
      cellDisplay: "none",
    }
  }

  toggleDisplayCells = () => {
		this.setState({
			cellDisplay: 'flex',
			startDisplay: 'none',
		})		
	}
  
  render(){
    return (
      <div className="flex-column-container"> 
            <StartButton action = {this.toggleDisplayCells} display={this.state.startDisplay}/> 
            <PomodoroTable display={this.state.cellDisplay}/>   
      </div>
    );
  };
};

export default App;
