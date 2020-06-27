import React, {useEffect} from 'react'
import {
    Paper, Button, Toolbar, Card,
  } from '@material-ui/core';
import { connect } from "react-redux";
import {tableAction} from '../../store/tableReducer'


function Cell ({id, dispatch, data, state}){
  let {tableReducer} = state
  let done;
  try{
    done = data.allMongodbTestTabledatas.edges[0].node.data   
  }catch(e){
    done = []
  }
   
  useEffect(()=> dispatch(
    tableAction({
      done, 
    })
  ), [dispatch])

  const clickFunction=()=>{
    dispatch(
      tableAction({
        done: done,
        activeId: id
      })
    )
  }

  const color = ()=>{
    if (tableReducer.activeId === id){
      return "green"
    }
    return done.includes(id)? "maroon" : "grey"
  }
  const cardStyle={
    width: "50px",
    height: "50px",
    backgroundColor: color()
  }

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