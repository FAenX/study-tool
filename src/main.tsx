import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import 'regenerator-runtime/runtime'

import { createStore } from "redux";
import rootReducer from './store/rootReducer'
import { connect, Provider } from 'react-redux'
import Summary from './components/stats/summary'
import Table from './components/table/cellsTable';
import Chart from './components/stats/lineGraph';
import {api} from "./api/users";
import Login from './components/login';
import {userAuth} from './api/auth'
import Signup from "./components/signup";
import SnackBar from "./components/common/snackbar"
import Loader from './components/common/loader'
import { useQuery } from "react-query";


// const LoginSignup

const Main = ({state, dispatch}) => {   
  React.useEffect(()=>{ 
    const headers = userAuth().headers
    console.log(headers)
    if(headers){
      //
    }else{
      dispatch({type: 'SET_COMPONENT', state: {component: 'login'}})
    }
    
  }, [])

  // const { isLoading, error, data } = useQuery('response', () =>
  //           api.login('', '').then(res =>res.json())
  //       )
  //   console.log(data)
  //   if (isLoading) return dispatch({type: 'SET_COMPONENT', state: {laoding: true}})
  //   if (error) return 'An error has occurred: ' + error

  return(   
    <div className="container is-flex is-justify-content-center is-align-content-center"> 
      {/* variables */}
      <div className="mt-4 animate__fadeIn">
        {state.notification.component === 'notify'? <SnackBar/> : null}
      </div>
      <div className="mt-4 animate__animated animate__fadeIn">
        {state.loginSignup.component === 'login'? <Login/> : state.loginSignup.component === 'signup'? <Signup/>:null}
      </div>
      {state.notification.loading ? <Loader />:null} 
      {/* end variables */}
      
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