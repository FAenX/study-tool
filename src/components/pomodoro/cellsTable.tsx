import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Toolbar, Card,
} from '@material-ui/core';
import './CellsTable.scss';
import { connect } from "react-redux";

//redux 

import Cell from './cell'
import {graphql} from 'gatsby'
import moment from 'moment'
import { tableAction } from '../../store/tableReducer';



const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

const Table=({data, dispatch, state})=> {
  
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

export default connect(state=>({
  state
}), null)(Table) 
