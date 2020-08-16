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
import  {setData} from './src/store/pomodorosReducer'
// import { gql} from '@apollo/client';


const store = createStore(rootReducer);
import { gql, useQuery } from '@apollo/client';
import {studyDataFunctions} from './src/backend/studyData'

const client = new studyDataFunctions().client

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
  res
}).catch(err=>err)



const App = () => {  
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