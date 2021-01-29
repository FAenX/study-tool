import React from 'react'
import { connect } from 'react-redux'


function Loader({state, dispatch}){
    return(
        <div className="loader-wrapper">
          <div className="loader is-loading"></div>
        </div>  
    )
}

export default connect ((state, dispatch)=>({state, dispatch}))(Loader)