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

const store = createStore(rootReducer);

const App = () => {    
  return(    
    <Provider store={store}> 
        <Header />
          <div className="wrapper">      
            <Summary />
            <Table />
            <Chart />
          </div>
    </Provider>   
  );
}

ReactDOM.render( <App />, document.getElementById("app"));