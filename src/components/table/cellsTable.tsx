import React from 'react';
import { connect } from "react-redux";
import Cell from './cell'
import { getUser, getActiveTable } from '../../api/queries';

const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};


// table
function Table({dispatch, state}){
  
  return (
    <div className="pomodoro-table">     
      <div className="cells">
        {makeList(30).map((i) => (
          <Cell key={i} id={i} dispatch={dispatch} state={state}/>
         ))} 
      </div>
    </div>
  );
}

export default connect((state, dispatch)=>({state, dispatch}))(Table) 
