import React from 'react'
import {Card} from '@material-ui/core'
import './summary.scss'
import Cell from '../pomodoro/cell'

const makeList = (num: number) => {
    const list = [];
    for (let i = 0; i < num; i += 1) {
      list.push(i);
    }
    return list;
  };
  

export default function Summary(){
    return(
        <Card variant="outlined" className="summary-wrapper">
            {makeList(14).map(i =>(<Cell key={i}/>))}
        </Card>
    )
}