import React, {Context} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Table from '../components/pomodoro/cellsTable';
import {graphql} from 'gatsby'
import moment from 'moment'
import Chart from '../components/data-display/lineGraph.tsx'
import './index.scss'
import Summary from '../components/data-display/summary'

const Wrapper=({data})=>{
  
  return(
    <div className="index-wrapper">      
      <Summary />
      <Table data={data.data} />
      <Chart />
      <Chart />
    </div>
  )
}

export default function IndexPage({pageContext}){
  let {data}=pageContext
  
  return (  
  <Layout>
    <SEO title="Home" />
    <Wrapper data={data}/>
  </Layout>
);}






