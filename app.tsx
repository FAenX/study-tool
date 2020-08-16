import React from "react";
import ReactDOM from "react-dom";
import Header from "./src/components/header";
import 'regenerator-runtime/runtime'

import { createStore } from "redux";
import rootReducer from './src/store/rootReducer'
import { Provider } from 'react-redux'
import Summary from './src/components/data-display/summary'
import Table from './src/components/pomodoro/cellsTable';
import Chart from './src/components/data-display/lineGraph'
import './app.scss'
import { ApolloProvider } from '@apollo/client';
// import { gql} from '@apollo/client';
const store = createStore(rootReducer);
import {studyDataFunctions} from './src/backend/studyData'
import moment from "moment";
import { gql, useQuery } from '@apollo/client';
import  {setData} from './src/store/pomodorosReducer'
import {setTableData} from './src//store/tableReducer'

// const GET_DATA = gql`
//    query pomodoros {
//    pomodoros {
//      day
//      data
//    }}`

const client = new studyDataFunctions().client
// app

client.query({
  query: gql`
  query pomodoros {
  pomodoros {
    day
    data
  }}
`}).then(res=>{
  store.dispatch(
    setData({
      pomodoros: res.data.pomodoros

    })
  )
  const today = res.data.pomodoros.find(
    (item: {day: string, data: number[]})=>{
    item.day === moment().format('YYYYMMMDD')
  })

  let done: number[];
  if (!today){
    done=[]
  }else{
    done=today.data
  }

  store.dispatch(
    setTableData({
      activeId: null,
      active: false,
      done,
    })
  )
}).catch(err=>err)

// import { ApolloConsumer } from '@apollo/client';

// const WithApolloClient = () => (
//   <ApolloConsumer>
//     {client => 'We have access to the client!' /* do stuff here */}
//   </ApolloConsumer>
// );

const App = () => {  

  // const { loading, error, data } = useQuery(GET_DATA);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  //retrun
  return(
    
    <Provider store={store}> 
      <ApolloProvider client={client}>   
        <Header />
          <div className="wrapper">      
            <Summary />
            <Table />
            <Chart />
          </div>
      </ApolloProvider>
    </Provider>
   
  );
}

ReactDOM.render( <App />, document.getElementById("app"));