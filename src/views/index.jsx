import React, {Context, useEffect} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import {graphql} from 'gatsby'

import './index.scss'
import Wrapper from './wrapper.tsx'
import {connect} from 'react-redux'
import { tableAction } from '../store/tableReducer';



export function IndexPage({data, dispatch, state}){
  
  console.log()
  useEffect(()=>{
    dispatch(
      tableAction({
        activeId: null,
        active: false,
        done: data.allMongodbTestTabledatas.edges.length > 0 ? data.allMongodbTestTabledatas.edges[0].node.data : [],
      })
    )
  }, [null])
  
  return (  
  <Layout>
    <SEO title="Home" />
    <Wrapper data={data} dispatch={dispatch} state={state}/>
  </Layout>
);}

export const data = graphql`
  query($dayId: String!){
      allMongodbTestTabledatas(filter: {day: {eq: $dayId }}) {
          edges {
              node {
              id
              day
              data
          }
      }
  }
}
`

export default connect(state=>state, null)(IndexPage)






