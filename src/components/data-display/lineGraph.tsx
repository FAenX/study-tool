import React, { Component } from 'react';
import {useStaticQuery, graphql} from 'gatsby'
import {DataFactory} from './DataFunctions'
import './lineGraph.scss'

import  CCharts, {Line}  from "react-chartjs-2";
import { Card } from '@material-ui/core';
import {chart1data} from './variables'


const Chart =()=>{
  let data = useStaticQuery(graphql`
    query{
    allMongodbTestTabledatas{
        edges {
            node {
            id
            day
            data
        }
        }
    }
    
    }
  
  `)

  data = data.allMongodbTestTabledatas.edges
  let dataFactory = new DataFactory(data, 10)

  //alldata
  let keys: string[] = dataFactory.makeHistoryKeysArr()
  let days: string[] = dataFactory.makeDaysArr()
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


export default Chart;
