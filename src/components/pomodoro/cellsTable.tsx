import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Toolbar, Card,
} from '@material-ui/core';

import './CellsTable.scss';

import Cell from './cell'


const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

const Table=()=> {  
  return (
    <Paper variant="outlined" className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Cell key={i}/>
         ))} 
      </div>
    </Paper>
  );
}

export default Table

