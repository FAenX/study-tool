import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import './CellsTable.scss';
import { connect } from "react-redux";
import { gql, useQuery } from '@apollo/client';
import {studyDataFunctions} from '../../backend/studyData'

const client = new studyDataFunctions().client

const data = client.query({
  query: gql`
  query tabledatas {
  tabledata {
    day
    data
  }}
`}).then(res=>console.log(res)).catch(err=>console.log(err))


//redux 
import Cell from './cell'

const makeList = (num: number) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

function Table({dispatch, state}){

  console.log(data)

  return (
    <Paper variant="outlined" className="pomodoro-table">     
      <div className="cells">
        {makeList(24).map((i) => (
          <Cell key={i} id={i} data={data} dispatch={dispatch} state={state}/>
         ))} 
      </div>
    </Paper>
  );
}

export default connect((state, dispatch)=>({state, dispatch}))(Table) 
