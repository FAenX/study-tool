import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"
import moment from "moment"


import './App.scss';

const months = {
  0: "January"
}

const days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
   
}
const today = new Date()
const date = today.getDate()
const day = days[today.getDay()]
const month= months[today.getMonth()]
const year = today.getFullYear()



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
      history: ""
      
    }
    this.FetchTableData = this.FetchTableData.bind(this)
  }

  componentDidMount =()=>{

    this.FetchTableData()

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
    
   
    const daysKeys = Object.keys(days).map(i=>
      `completed_${days[i]}`
    )    
    
    const history = makeObject(daysKeys)

    this.setState({
      history,
			completed: JSON.parse(localStorage.getItem(`completed_${day}`))

    })
    
  }

  handleTableReset=()=>{
    localStorage.setItem(`completed_${day}`, JSON.stringify([]))
    this.componentDidMount()

  }

  //read from db
  async FetchTableData(){
    const GetData= fetch("/api/v1/TableData/", {
      method: "GET",
                    
      }).then(res=>res.json())
      .catch((err)=>{
          console.log(err)
      })    
      const response = await GetData.then(data=>data).catch(err=>err)
      console.log(response)
      return response
  }
  
  //write to db
  async WriteTableData(data){
    const PostData = fetch("/api/v1/TableData/", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: data
                    
      }).then(res=>res.json())
      .catch((err)=>{
          console.log(err)
      })    
      const response = await PostData.then(data=>data).catch(err=>err)
      console.log(response)
      return response
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

    const data = {
                    "TableData":{
                      "data": this.state.completed,
                      "day": `completed_${day}`
                    }
                  }
    
    
                  //write to db
    this.WriteTableData(JSON.stringify(data))
    localStorage.setItem(
      `completed_${day}`, JSON.stringify(this.state.completed))
	}

  render(){

    
    console.log(moment(today))

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
                days={days} 
                date={date} 
                day={day} 
                month={month} 
                year={year}
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
