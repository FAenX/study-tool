import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Toolbar, Card,
} from '@material-ui/core';

import './CellsTable.scss';


//redux 

import { connect } from "react-redux";
import {toggleColor} from '../../store/app'


const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};



const Table=({color, dispatch})=> {  
  console.log(color, dispatch)
 
  const cardStyle={
    width: "40px",
    height: "40px",
    margin: ".25em",
    backgroundColor: color
  }

  return (
    <Paper variant="outlined" className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Card
            key={i}
            id={i}
            onClick={()=>dispatch(toggleColor('green'))}
            variant="elevation"
            elevation={5}
            style={cardStyle}
          />
         ))} 
      </div>
    </Paper>
  );
}

export default connect(state=>({
  color: state.app.color
}), null)(Table)

