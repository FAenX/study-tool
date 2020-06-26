import React, { Component } from 'react';
import {useStaticQuery, graphql} from 'gatsby'
import {AllData} from './DataFunctions'
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
  console.log(data)
  let keys =AllData.makeHistoryKeysArr(data, 12)
  let days = AllData.makeDaysArr(data, 12)
  data = keys.map(key=>AllData.filterHistory(data, key))
  console.log(data)
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
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              tooltipLabelColor: "rgba(179,181,198,1)",
              data: data,
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
