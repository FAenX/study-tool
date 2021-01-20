import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import './CellsTable.scss';
import { connect } from "react-redux";
import Cell from './cell'



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
    <Paper variant="outlined" className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Cell key={i} id={i} dispatch={dispatch} state={state}/>
         ))} 
      </div>
    </Paper>
  );
}

export default connect((state, dispatch)=>({state, dispatch}))(Table) 
