import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Toolbar, Card,
} from '@material-ui/core';

import './CellsTable.scss';

//redux 
import {CellState} from '../../store/reducers/tableReducer'

import { connect } from "react-redux";
import {tableReducer} from '../../store/reducers/tableReducer'

import {Cell} from './cell'


import moment from 'moment'



const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

const Table=({data, dispatch, state})=> {
  useEffect(()=> dispatch(
    tableReducer({done: data.allMongodbTestTabledatas.edges[0].node.data, active: [1], activeId: 1 })
  ), [null])
 
  console.log()   
  return (
    <Paper variant="outlined" className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Cell key={i} id={i} done={state.tableReducer.done}/>
         ))} 
      </div>
    </Paper>
  );
}




export default connect(state=>({
  state
}), null)(Table)