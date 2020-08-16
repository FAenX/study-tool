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
import {setTableData} from './src/store/tableReducer'
import {setUser} from './src/store/userReducer'

// const GET_DATA = gql`
//    query pomodoros {
//    pomodoros {
//      day
//      data
//    }}`

const backend = new studyDataFunctions()

const client = backend.client
// app

backend.authenticate().then(res=>{
  store.dispatch(
    setUser({
      id: res.user_id
    })
  )
  return
})


client.query({
  query: gql`
  query {
  pomodoros(limit: 1000) {
    day
    data
    _id
    user_id
  }}
`}).then(res=>{
  let response = res
  store.dispatch(
    setData({
      pomodoros: response.data.pomodoros
    })
  )
  const today = response.data.pomodoros.find(
    (item: any)=>{
    return item.day+'' === moment().format('YYYYMMMMDD')
  })


  let done: number[];
  let day: string
  let id: string
  if (!today){
    done=[]
    day=moment().format('YYYYMMMMDD')
  }else{
    done=today.data
    day=today.day
    id = today._id
  }

  store.dispatch(
    setTableData({
      activeId: null,
      active: false,
      done,
      day,
      id
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