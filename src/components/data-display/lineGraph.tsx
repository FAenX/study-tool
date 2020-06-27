import React, { Component } from 'react';
import {useStaticQuery, graphql} from 'gatsby'
import {DataFactory} from './DataFunctions'
import './lineGraph.scss'

import  CCharts  from "react-chartjs-2";
import { Card } from '@material-ui/core';
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
  let dataFactory = new DataFactory(data, 14)

  //alldata
  let keys: string[] = dataFactory.makeHistoryKeysArr()
  let days: string[] = dataFactory.makeDaysArr()
  let dailyData = keys.map(key=>dataFactory.dailyData(key))

  //averages 
  let averageData = keys.map(key=>dataFactory.average(key))
 
  return (
    <Card variant="outlined" className="chart-wrapper">
      
    <CCharts
        type="line"
        label= "Productivity"
        height={300}
        width={400}
        data={{
        labels:days,
        datasets:[         
            {
              label: "Study time",
              backgroundColor: "#1455ee17",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              tooltipLabelColor: "rgba(179,181,198,1)",
              data: dailyData,
            },   
            {
              label: "Study time",
              backgroundColor: "#9e14ee17",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              tooltipLabelColor: "rgba(179,181,198,1)",
              data: averageData,
            },   
                
        ]
      }}
      options={{
        aspectRatio: 16 / 9,
        tooltips: {
          enabled: true,
        },
      }}
          
        
      /></Card>
    );}


export default Chart;
