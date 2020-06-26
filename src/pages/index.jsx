import React, {Context} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Table from '../components/pomodoro/cellsTable';
import {graphql} from 'gatsby'
import moment from 'moment'

const IndexPage = ({pageContext}) =>{
  
  const {data} = pageContext.data

  return (
  
  <Layout>
    <SEO title="Home" />
    <Table data={data}/>
  </Layout>
);}

const dayId = moment().format()


export default IndexPage;
