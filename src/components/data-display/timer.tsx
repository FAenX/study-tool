import React, { useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import moment from 'moment';
import {timerAction} from '../../store/timerReducer'
import {setTableData} from '../../store/tableReducer'


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
  let timerReducer = state.timerReducer
  let tableReducer = state.tableReducer

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

      dispatch(
        timerAction({
        startTime: moment().format(),
        active: timerReducer.active,
        progress: progress,
        countDown: countDown,
        endTime: timerReducer.endTime
      }))
    }else if(
      moment().format('mm') === moment(timerReducer.endTime)
      .format('mm')){
        
      dispatch(
        timerAction({
        startTime: null,
        active: false,
        progress: 0,
        countDown: '00:00',
        endTime: null
      }))
     
      dispatch(
        setTableData({
          done: tableReducer.done.concat(tableReducer.activeId),
          active: false,
          activeId: null,
          day:tableReducer.day,
          id: tableReducer.id
      }))
      //here
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