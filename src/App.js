import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"


import './App.scss';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
      history: ""
      
    }
  }

  componentDidMount =()=>{

    const day = (string)=>{
      let str = string.split("_")
      return(str[1])
    }

    const makeObject =(keys)=>{
      let obj = {}
      for (let i=0; i<keys.length; i++){
        obj[day(keys[i])]=JSON.parse(
          localStorage.getItem(keys[i]))         
      }
      return obj
    }
    
   
    const daysKeys = Object.keys(this.days).map(i=>
      `completed_${this.days[i]}`
    )    
    
    const history = makeObject(daysKeys)

    this.setState({
      history,
			completed: JSON.parse(localStorage.getItem(`completed_${this.day}`))

    })
    
  }

  handleTableReset=()=>{
    localStorage.setItem(`completed_${this.day}`, JSON.stringify([]))
    this.componentDidMount()

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
    
    localStorage.setItem(
      `completed_${this.day}`, JSON.stringify(this.state.completed))
	}

  render(){

    this.months = {
      0: "January"
    }

    this.days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
       
    }
    this.today = new Date()
    this.date = this.today.getDate()
    this.day = this.days[this.today.getDay()]
    this.month= this.months[this.today.getMonth()]
    this.year = this.today.getFullYear()

    return (
      <div className="App">
        <AppBar className="App-header sliding-effect"> 
        <MenuOpenOutlined />
        Pomodoro Study Tool
        </AppBar>
      <div className="main-app-wrapper"> 
        
              <DashBoard 
                done={this.state.completed} 
                completed={this.state.completed}
                days={this.days} 
                date={this.date} 
                day={this.day} 
                month={this.month} 
                year={this.year}
                history={this.state.history}
              />
            <CellTable 
              handleTableReset={this.handleTableReset}
              addToCompleted={this.addToCompleted} 
              completed={this.state.completed}
            />
          </div>           
            <div className="stats-wrapper">
              
            </div>
      </div>
    );
  };
};

export default App;
