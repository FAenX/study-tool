import React, { useEffect } from 'react';
import  CCharts, {Line}  from "react-chartjs-2";
import {chart1data} from './variables'
import { connect } from "react-redux";


const Chart =({dispatch, state})=>{

  // console.log(dataFactory.)

  //alldata
  

  //averages 

  let chartData = chart1data([], [], [])

  return (
    <div className="chart-wrapper is-flex p-2 m-2">
      
    <CCharts
        type="line"
        label= "Productivity"
        height={300}
        width={400}
        data={chartData.dailyData}
        options={chartData.options} 
      /></div>
    );}


export default connect((state, dispatch)=>({state, dispatch}))(Chart);
