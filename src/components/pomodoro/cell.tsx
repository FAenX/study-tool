import React, {useEffect} from 'react'
import {
    Paper, Button, Toolbar, Card,
  } from '@material-ui/core';
import {tableAction} from '../../store/tableReducer'
import {timerAction} from '../../store/timerReducer'
import moment from 'moment'
import {connect} from 'react-redux'


function Cell ({id, dispatch, data, state}){
  
  let done: number[];
  try{
    done = data.allMongodbTestTabledatas.edges[0].node.data   
  }catch(e){
    done = []
  }

  const clickFunction=()=>{
    // start timer
    if(!state.tableReducer.active){
      dispatch(
        timerAction({
          startTime: moment().format(),
          active: true,
          progress: 0,
          countDown: 'started',
          endTime: moment().add(1, 'minutes').format()
  
        })
      )
       // change state
      dispatch(
        tableAction({
          activeId: id,
          active: true,
          done,
        })
      )
    }  
  }

  const color = ()=>{
    if (state.tableReducer.activeId === id){
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
  
export default Cell