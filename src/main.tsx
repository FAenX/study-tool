import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import 'regenerator-runtime/runtime'

import { createStore } from "redux";
import rootReducer from './store/rootReducer'
import { connect, Provider } from 'react-redux'
import Summary from './components/data-display/summary'
import Table from './components/pomodoro/cellsTable';
import Chart from './components/data-display/lineGraph';
import {api} from "./api/users";
import Login from './components/login';
import {userAuth} from './api/auth'


// const LoginSignup

const Main = ({state, dispatch}) => {   
  React.useEffect(()=>{ 
    const headers = userAuth().headers
    console.log(headers)
    if(headers){
      //
    }else{
      dispatch({type: 'SET_COMPONENT', state: {component: <Login/>}})
      console.log(state.loginSignup.component)
    }
    
  }, [])

  return(   
    <div className="container is-flex is-justify-content-center is-align-content-center"> 
    <div className="mt-6">{state.loginSignup.component}</div>
      
        <div className="is-flex m-4 is-flex-direction-column">
            <div className="container m-4">
              <Header />
            </div> 
            <div className="container p-4">
              <div className="is-flex is-flex-direction-row is-align-content-center is-justify-content-center is-flex-wrap-wrap">
                <div className="m-2">
                  <Summary />
                </div>
                <div className="m-2">
                  <Table />
                </div>
                <div className="m-2">
                  <Chart />
                </div>
              </div>
            </div>
        </div> 
    </div> 
  );
}

export default connect((state, dispatch)=>({state, dispatch}))(Main)