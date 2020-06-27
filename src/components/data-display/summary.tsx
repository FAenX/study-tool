import React from 'react'
import {Card} from '@material-ui/core'
import './summary.scss'
import Cell from '../pomodoro/cell'
import Timer from './timer'
import {connect} from 'react-redux'

const makeList = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
      list.push(i);
    }
    return list;
  };
  

function Summary({dispatch, state}){
    return(
        <Card variant="outlined" className="summary-wrapper">
          <Timer dispatch={dispatch} state={state}/>
            {/* {makeList(14).map(i =>(<Cell key={i}/>))} */}
        </Card>
    )
}

export default connect(state=>({
  state
}), null)(Summary) 
