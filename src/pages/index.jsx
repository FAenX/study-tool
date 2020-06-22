import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Table from '../components/pomodoro/cellsTable';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Table 
     handleTableReset=""
     addToCompleted=""
     completed=""
     cells={20}
     addCells=""
    />
  </Layout>
);

export default IndexPage;
