import React, {Context} from 'react';
import Layout from './layout';
import SEO from './seo';
import Table from './pomodoro/cellsTable';
import {graphql} from 'gatsby'
import moment from 'moment'
import Chart from '../components/data-display/lineGraph.tsx'
import './index.scss'
import Summary from './data-display/summary'
import {Card} from '@material-ui/core'

const Wrapper=({allData})=>{
  const {data} =allData
  return(
    <div className="index-wrapper">      
      <Summary />
      <Table data={data} />
      <Chart />
      <Chart />
    </div>
  )
}

export default function IndexPage({pageContext}){
  let {allData}=pageContext
  
  return (  
  <Layout>
    <SEO title="Home" />
    <Wrapper allData={allData}/>
  </Layout>
);}






