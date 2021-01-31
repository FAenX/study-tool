import React from 'react';
import { connect } from "react-redux";
import Cell from './cell'
import {api} from '../../api/table'

const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};


// table
function Table({dispatch, state}){

  const request = async()=>{
    try{
      const res = await api.getRunningTable()
      console.log(res.data)
      dispatch({type: 'SET_TABLE_DATA', state: {done: res.data.count}})
      console.log(res.data.count)
    }catch(e){
      console.log(e)
    }
 
  }
  React.useEffect(()=>{
      request()
  }, [null])
  
  return (
    <div className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Cell key={i} id={i} dispatch={dispatch} state={state}/>
         ))} 
      </div>
    </div>
  );
}

export default connect((state, dispatch)=>({state, dispatch}))(Table) 
