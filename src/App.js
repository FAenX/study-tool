import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"
import moment from "moment"


import './App.scss';

const now = moment()
const today = now.format("YYYYMMMMD")
console.log(now.format("YYYYMMMMD"))

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
    const history = this.FetchTableData()
    
    this.setState({
			completed: JSON.parse(localStorage.getItem(today))
    })    
  }

  handleTableReset=()=>{
    localStorage.setItem(today, JSON.stringify([]))
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
      this.setState({
        history:response,
      })    
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

    const data = {"data": this.state.completed, "day":today}
    
    //write to db
    this.WriteTableData(JSON.stringify(data))
    localStorage.setItem(
      today, JSON.stringify(this.state.completed))
	}

  render(){
    return (
      <div className="App">
        <AppBar className="App-header sliding-effect"> 
            <MenuOpenOutlined />
            Pomodoro Study Tool
        </AppBar>
        <div className="main-app-wrapper">         
            <DashBoard 
              now={now}
              completed={this.state.completed}
              history={this.state.history}
            />
            <CellTable 
              handleTableReset={this.handleTableReset}
              addToCompleted={this.addToCompleted} 
              completed={this.state.completed}
            />
        </div>           
            <div className="stats-wrapper"></div>
      </div>
    );
  };
};

export default App;
