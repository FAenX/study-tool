import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import moment from 'moment';
import './Timer.scss';
import PropTypes, { string } from 'prop-types';
import { connect } from "react-redux";
import {TimerState, timerAction} from '../../store/timerReducer'
import {TableState, tableAction} from '../../store/tableReducer'
import { graphql } from 'gatsby';

interface Model{
  id: string;
  day: string;
  data: number[]
}

interface Model{
  id: string;
  day: string;
  data: number[]
}

const Progress = ({progress}) => {
   
    return 	(
      <LinearProgress
        className="linear-progress"
        variant= "determinate"
        color= {progress < 10 ? "secondary" : "primary"}
        value={progress}
      />
    )
};

const Timer = ({state, dispatch}) => {
  let timerReducer: TimerState = state.timerReducer
  let tableReducer: TableState = state.tableReducer

  useEffect(() => {
    const timer = setInterval(
      () => updateClock(), 1000,
    );
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const updateClock = () => {

    if (moment() < moment(timerReducer.endTime)) {

      // set up
      let start = moment(timerReducer.startTime); 
      let end = moment(timerReducer.endTime);
      let diff = end.diff(start);

      let countDown = moment.utc(diff).format("mm:ss");      

      // progress percentage
      let t: number = parseFloat(moment.utc(diff).format("mm.ss"));
      const progress = (t/30)*100;
      console.log(t)

      dispatch(timerAction({
        startTime: moment().format(),
        active: timerReducer.active,
        progress: progress,
        countDown: countDown,
        endTime: timerReducer.endTime
      }))
    }else if(moment().format('mm') === moment(timerReducer.endTime).format('mm')){
      dispatch(timerAction({
        startTime: null,
        active: false,
        progress: 0,
        countDown: '00:00',
        endTime: null
      }))
     
      dispatch(tableAction({
        done: tableReducer.done.concat(tableReducer.activeId),
        active: false,
        activeId: null,
      }))
      // write data to db
<<<<<<< HEAD
      //here      
=======
      //here

      const writeToDb =()=>graphql`
        mutation mongodbTestTabledatas($ep: Episode!, $review: ReviewInput!) {
          createReview(episode: $ep, review: $review) {
            stars
            commentary
          }
        }
        `
        writeToDb()
      
>>>>>>> 9fba6b9cb51cbb012c80c3df4f2ea030adff1b8b

    }
  };

  return (
    <div id="progress-bar">
      <Progress progress={timerReducer.progress}/>
      <div >
        {timerReducer.countDown}
      </div>
    </div>

  );
};



export default Timer