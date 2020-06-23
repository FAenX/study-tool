import React from 'react'
import {
    Paper, Button, Toolbar, Card,
  } from '@material-ui/core';

//redux 
import {CellState} from '../../store/reducers/toggleColor'

import { connect } from "react-redux";
import {toggleColor} from '../../store/reducers/toggleColor'

const Cell =({status, dispatch})=>{
    const cardStyle={
      width: "40px",
      height: "40px",
      margin: ".25em",
      backgroundColor: status.toggleColor.color
    }
    return (
      <Card         
          onClick={()=>dispatch(toggleColor({color: 'green', status: 'active'}))}
          variant="elevation"
          elevation={5}
          style={cardStyle}
        />
    )
  }
  
  export default connect(state=>({
    status: state
  }), null)(Cell)