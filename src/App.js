import React, { useState, useEffect } from 'react';
import CellTable from "./CellsTable"
import DashBoard from "./dashboard/dashboard"
import {AppBar, Backdrop, CircularProgress} from "@material-ui/core"
import {MenuOpenOutlined} from "@material-ui/icons"
import moment from "moment"
import './App.scss';
import KanBan from "./components/KanBan"
import {UpdateTableData, FetchTableData, WriteTableData} from "./requests"
import {AllData} from "./DataFunctions"

const Main=props=>{
  return( <div className="main-app-wrapper">  
                  <div className="table-min-data-display">
                    <DashBoard 
                      completed={props.completed}
                      history={props.history}
                    />
                    <CellTable 
                      handleTableReset={props.handleTableReset}
                      addToCompleted={props.addToCompleted} 
                      completed={props.completed}
                      cells={props.cells}
                      addCells={props.addCells}
                    />  
                  </div> 
            </div>  
        )
}

export default function App (props) {
 
  const [completed, setCompleted]=useState([])
  const [loading, setLoading]=useState(false)
  const [cells, setCells]=useState(20)
  const [history, setHistory]=useState([])

 useEffect(()=>{
    const history = JSON.parse(localStorage.getItem("history")) 
    const checkHistory=()=>{
      if (history == null || history === undefined){
        setLoading(true)
        //read from db
        FetchTableData()
      }else{
        return
      }
      
    }

    checkHistory()
    
    const historyToday = AllData.filterHistory(history, moment().format("YYYYMMMMDD"))
    const historyOnstorage =  JSON.parse(localStorage.getItem(moment().format("YYYYMMMMDD")))
    if (historyOnstorage == null && historyToday !== null && historyToday !== undefined){
      setCompleted(historyToday.data) 
    }else {
      setCompleted([])
    }
    setHistory(history)
    
  },[loading])
  
 const handleTableReset=()=>{
    localStorage.setItem(moment().format("YYYYMMMMDD"), JSON.stringify([]))
  }

  const addCells=()=>{
    setCells((state, props) => ({
      cells: state.cells + 1
    }))
  }

	//add completed cell to list
	const addToCompleted=(cell)=>{	
		let prevCompleted = completed
		try{
			prevCompleted[cell] = cell
		}catch{
			prevCompleted = [cell]
		}        
		setCompleted((prevState, props)=>({
		  prevCompleted,
    }))

    const data = {"data": completed, "day":moment().format("YYYYMMMMDD")}
    //write to db
    WriteTableData(JSON.stringify(data))
    localStorage.setItem(
      moment().format("YYYYMMMMDD"), JSON.stringify(completed))
	}

    const toShow=()=>{
      
      if (!loading){
        return(<Main handleTableReset={handleTableReset}
                      addToCompleted={addToCompleted} 
                      completed={completed}
                      cells={cells}
                      addCells={addCells}
                      history={history}
                  />)
      }else{
        return (<Backdrop 
                open={this.state.loading}
              ><CircularProgress color="inherit" /></Backdrop>
        )
      }
    };
   
    
   
    return (
      <div className="App">
        <AppBar className="App-header sliding-effect"> 
            <MenuOpenOutlined />
            Pomodoro Study Tool
        </AppBar>
         {toShow()}
      </div>
    );
  };
