import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import './CellsTable.scss';
import { connect } from "react-redux";
import  {setData} from '../../store/pomodorosReducer'
import {setTableData} from '../../store/tableReducer'
import Cell from './cell'
import { gql, useMutation} from '@apollo/client';


const UPDATE_TABLE =  gql`
    mutation($data: PomodoroUpdateInput!, $date: String!){
    updateOnePomodoro(query: {day: $date}, set: $data) {
      data
      day
      user_id
      _id
    }
  }
`


const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};


// table
function Table({dispatch, state}){
  const [updateTable, { data }] = useMutation(UPDATE_TABLE)
  // write data to db
  updateTable({
    variables: {
      data: {
        data: state.tableReducer.done, 
        day: state.tableReducer.day,
        user_id: state.userReducer.id,
      },
      date: state.tableReducer.day
    }
  })

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
