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
import {studyDataFunctions} from './src/backend/studyData'
import { ApolloProvider } from '@apollo/client';

// import { gql} from '@apollo/client';


const store = createStore(rootReducer);
  // init client
const client = new studyDataFunctions().client

// console.log(client.query({
//   query: gql`
//   query tabledatas {
//   tabledata {
//     day
//     data
//   }}
// `}).then(res=>console.log(res)).catch(err=>console.log(err))
// )


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