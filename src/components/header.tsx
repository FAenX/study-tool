import React from "react";
import { connect } from "react-redux";
import { ptfs0u } from "../utils/variables";


const Header = ({state, dispatch}) => {

  const logout=()=>{
      localStorage.removeItem(ptfs0u)
      dispatch({type: 'SET_COMPONENT', state: {component: 'login'}})
  }
  
  const button = <a onClick={logout}>logout</a>
   

  return(
    <nav id="nav" className="is-flex is-justify-content-center is-align-content-center">
      <div className="p-4">Study Tool</div>
      <div className="p-4">{state.loginSignup.component === null? button :null}</div>
    </nav>
  )
};

export default connect((state, dispatch)=>({state, dispatch}))(Header);
