import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"
import moment from "moment"
import './App.scss';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
    }
    this.FetchTableData = this.FetchTableData.bind(this)
    this.UpdateTableData = this.UpdateTableData.bind(this)
    this.WriteTableData = this.WriteTableData.bind(this)
  }

  componentDidMount =()=>{
    this.FetchTableData()
    // try{
    //   const TableData = JSON.parse(localStorage.getItem("history"))

    //   if(TableData==null || TableData===undefined ){
    //     this.FetchTableData()
    //   }
    // }catch{

    // }
   
    this.setState({
			completed: JSON.parse(localStorage.getItem(moment().format("YYYYMMMMD")))
    })    
  }
  handleTableReset=()=>{
    localStorage.setItem(moment().format("YYYYMMMMD"), JSON.stringify([]))
  }

  //read from db
  async FetchTableData(){
    console.log("fetching")
    const GetData= fetch("/api/v1/TableData/", {
      method: "GET",                    
      }).then(res=>res.json())
      .catch((err)=>{
          console.log(err)
      })    
      const response = await GetData.then(data=>data).catch(err=>err)
      try
      {
        localStorage.removeItem("history")
      }
      catch{
        //
      }
      console.log(response)
      localStorage.setItem("history", JSON.stringify(response))
      return response
  }

  //update db
  async UpdateTableData(data){
    console.log("updating")
    const UpdateData= fetch("/api/v1/TableData/", {
      method: "PATCH", 
      headers: {"Content-type": "application/json"},
      body: data                       
      }).then(res=>res.json())
      .catch((err)=>{
          console.log(err)
      })    
      const response = await UpdateData.then(data=>data).catch(err=>err)
      console.log(response)
      return response
  }
  
  
  //write to db
  async WriteTableData(data){
    const PostData = fetch("/api/v1/TableData/", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: data                    
      }).then(res=>{
        return res.json()
      })
      .catch((err)=>{
          console.log(err)
      })    
      const response = await PostData.then(data=>data).catch(err=>err)
      
      console.log(response)
      if (response.status === 400 && response.id)
      {
        data=JSON.parse(data)
        data["id"]=response.id
        console.log(data)
        this.UpdateTableData(JSON.stringify(data))
      }
      
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

    const data = {"data": this.state.completed, "day":moment().format("YYYYMMMMD")}
    console.log(data)
    //write to db
    this.WriteTableData(JSON.stringify(data))
    localStorage.setItem(
      moment().format("YYYYMMMMD"), JSON.stringify(this.state.completed))
	}

  render(){
    try{
      const TableData = JSON.parse(localStorage.getItem("history"))

      if(TableData==null || TableData===undefined ){
        this.FetchTableData()
      }
    }catch{

    }
    return (
      <div className="App">
        <AppBar className="App-header sliding-effect"> 
            <MenuOpenOutlined />
            Pomodoro Study Tool
        </AppBar>
        <div className="main-app-wrapper">         
            <DashBoard 
              completed={this.state.completed}
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
