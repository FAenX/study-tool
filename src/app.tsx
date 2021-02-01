import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducer from './store/rootReducer'
import { Provider } from 'react-redux'
import './app.scss';
import Main from './main'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

 

 const queryClient = new QueryClient()



const store = createStore(rootReducer);

// const LoginSignup

const App = () => {   

  return(  
    <Provider store={store}> 
        <Main/>
  </Provider>  
  );
}

ReactDOM.render( <App />, document.getElementById("app"));