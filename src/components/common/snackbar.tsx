import React from 'react'
import { connect } from 'react-redux'


function SnackBar({state, dispatch}){
    return(
        <div id="snackbar" className={`bounce notification ${state.notification.color}`}>
            <button className="delete"></button>
            {state.notification.message}.
        </div>
    )
}

export default connect ((state, dispatch)=>({state, dispatch}))(SnackBar)