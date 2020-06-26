import React, {useEffect} from 'react'
import {
    Paper, Button, Toolbar, Card,
  } from '@material-ui/core';
import { connect } from "react-redux";

import {CellState} from '../../store/reducers/tableReducer'
import {tableReducer} from '../../store/reducers/tableReducer'


function Cell ({id, dispatch, data, state}){
    let done = data.allMongodbTestTabledatas.edges[0].node.data
    
    useEffect(()=> dispatch(
      tableReducer({
        done, 
      })
    ), [null])

    const clickFunction=()=>{
      dispatch(
        tableReducer({
          done: done,
          activeId: id
        })
      )
    }

    const cardStyle={
      width: "40px",
      height: "40px",
      margin: ".25em",
      backgroundColor: done.includes(id)? "maroon" : "grey"
    }
    console.log(state)
    return (
      <Button onClick={()=>clickFunction()}>
        <Card   
          id ={id} 
          variant="elevation"
          elevation={5}
          style={cardStyle}
      />
    </Button>
    )
  }
  
export default connect(state=>({
    state
  }), null)(Cell)  