import React from "react";
import ReactDOM from "react-dom";
import Header from "./src/components/header";
import 'regenerator-runtime/runtime'

import { createStore } from "redux";
import rootReducer from './src/store/rootReducer'
import { Provider } from 'react-redux'
import Summary from './src/components/data-display/summary'
import Table from './src/components/pomodoro/cellsTable';
import Chart from './src/components/data-display/lineGraph';
import './app.scss';
import {api} from "./src/api/users"

const store = createStore(rootReducer);

const App = () => {   
  React.useEffect(()=>{
    try{
      const response = api.login('','').then(res=>res).catch(err=>err)
      console.log(response)
    }catch(e){
      console.log(e)
    }
    
  })

  return(    
    <div className="container is-flex"> 
      <Provider store={store}>  
        <div className="is-flex m-4 is-flex-direction-column">
            <div className="container m-4">
              <Header />
            </div> 
            <div className="container p-4">
              <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                <div className="column">
                  <Summary />
                </div>
                <div className="column">
                  <Table />
                </div>
                <div className="column">
                  <Chart />
                </div>
              </div>
            </div>
        </div>       
          
            
        
      </Provider>  
    </div> 
  );
}

ReactDOM.render( <App />, document.getElementById("app"));