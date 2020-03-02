import React from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"
import moment from "moment"
import './App.scss';
import KanBan from "./components/KanBan"


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      completed: [],
    }
    
  }

  componentDidMount =()=>{
    this.setState({
			completed: JSON.parse(localStorage.getItem(moment().format("YYYYMMMMD")))
    })    
  }
  handleTableReset=()=>{
    localStorage.setItem(moment().format("YYYYMMMMD"), JSON.stringify([]))
  }

  //read from db
  FetchTableData = async ()=>{
    console.info("fetching")
    const fetchData =  await fetch("/api/v1/TableData/", {
      method: "GET",                    
      })
      const response = await fetchData.json()
      try
      {
        localStorage.removeItem("history")
      }
      catch{
        //
      }
      localStorage.setItem("history", JSON.stringify(response))
      return response
  }

  //update db
  UpdateTableData = async (data)=>{
    console.info("updating")
    const updateRequest= await fetch("/api/v1/TableData/", {
      method: "PATCH", 
      headers: {"Content-type": "application/json"},
      body: data                       
      })    
      const response = await updateRequest.json()
      return response
  }
  
  
  //write to db
  WriteTableData=async (data)=>{
    const writeRequest = await fetch("/api/v1/TableData/", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: data                    
      })    
      const response = await writeRequest.json()
      
      if (response.status === 400 && response.id)
      {
        data=JSON.parse(data)
        data["id"]=response.id
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
            <div className="table-min-data-display">
              <DashBoard 
                completed={this.state.completed}
              />
              <CellTable 
                handleTableReset={this.handleTableReset}
                addToCompleted={this.addToCompleted} 
                completed={this.state.completed}
              />  
            </div> 
               
            
            <KanBan />  
            {/* <KanBan />   
            <KanBan />     */}
            
        </div>           
         
      </div>
    );
  };
};

export default App;
