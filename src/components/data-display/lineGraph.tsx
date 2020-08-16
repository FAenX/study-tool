import React, { useEffect } from 'react';
import {DataFactory} from './DataFactory'
import './lineGraph.scss'

import  CCharts, {Line}  from "react-chartjs-2";
import { Card } from '@material-ui/core';
import {chart1data} from './variables'
import { connect } from "react-redux";


const Chart =({dispatch, state})=>{

  const {pomodoros} = state.pomodorosReducer
  let dataFactory = new DataFactory(pomodoros, 30)
  // console.log(dataFactory.)

  //alldata
  let keys = dataFactory.makeHistoryKeysArr()
  let days = dataFactory.makeDaysArr()
  
  let dailyData = keys.map(key=>dataFactory.dailyData(key))

  //averages 
  let averageData = keys.map(key=>dataFactory.average(key))

  let chartData = chart1data(days, dailyData, averageData)

  return (
    <Card variant="outlined" className="chart-wrapper">
      
    <CCharts
        type="line"
        label= "Productivity"
        height={300}
        width={400}
        data={chartData.dailyData}
        options={chartData.options} 
      /></Card>
    );}


export default connect((state, dispatch)=>({state, dispatch}))(Chart);
