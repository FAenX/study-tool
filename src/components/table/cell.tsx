import React from 'react'
import {
    Button, Card,
  } from '@material-ui/core';
import {timerAction} from '../../store/timerReducer'
import moment from 'moment'
import { getActiveTable } from '../../api/queries';


function Cell ({id, dispatch, state}){

  const clickFunction=()=>{
    // start timer
    if(!state.activeTableReducer.active){
      dispatch(
        timerAction({
          startTime: new Date().toString(),
          active: true,
          progress: 0,
          countDown: 'started',
          // time
          endTime: moment().add(30, 'minutes').format()
  
        })
      )
       // change state
      dispatch({type: 'SET_TABLE_DATA', 
        state:{
        activeId: id,
        active: true,
        done: state.activeTableReducer.done,
        day: state.activeTableReducer.day,
        id: state.activeTableReducer.id
        }
      })
    }  
  }


  const color = ()=>{
    if (state.activeTableReducer && state.activeTableReducer.activeId == id){
      return "green"
    }
    return state.activeTableReducer && state.activeTableReducer.done >= id  ? "maroon" : "grey"
  }
  const cardStyle={
    width: "40px",
    height: "40px",
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