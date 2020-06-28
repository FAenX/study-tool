import React from 'react'
import moment from 'moment'
import Chart from '../components/data-display/lineGraph'
import Table from '../components/pomodoro/cellsTable';
import Summary from '../components/data-display/summary'
import {Card} from '@material-ui/core'
import {connect} from 'react-redux'

const Wrapper=({data, dispatch, state})=>{
  
  return(
    <div className="index-wrapper">      
      <Summary dispatch={dispatch}/>
      <Table data={data} dispatch={dispatch} state={state}/>
      <Chart />
      <Chart />
    </div>
  )
}

export default Wrapper