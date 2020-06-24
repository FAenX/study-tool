import React, {Context} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Table from '../components/pomodoro/cellsTable';
import {graphql} from 'gatsby'

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <Table data={data}/>
  </Layout>
);

export const query = graphql`
  query{
    allMongodbTestTabledatas(filter: {day: {eq: "2020June24"}}) {
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

export default IndexPage;
