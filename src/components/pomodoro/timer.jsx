import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import moment from 'moment';
import './Timer.scss';
import PropTypes from 'prop-types';

const Progress = (props) => {
  if (props.progress <= 90) {
    return 	(
      <LinearProgress
        className="linear-progress"
        variant="determinate"
        color="primary"
        value={props.progress}
      />
    );
  } if (props.progress > 90) {
    return (
      <LinearProgress
        className="linear-progress"
        variant="determinate"
        color="secondary"
        value={props.progress}
      />
    );
  }
  return (
    <LinearProgress
      className="linear-progress"
      variant="determinate"
      value={100}
      color="primary"
    />
  );
};

const Timer = (props) => {
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => updateClock(), 1000,
    );
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const updateClock = () => {
    if (moment(props.timer).add(30, 'minutes') < moment()) {
      props.handleOnComplete();
      setProgress(0);
      setCountDown(0);
      setTime(0);
    }
    const remTime = moment(props.timer).add(0.5, 'hours') - moment();
    const countDown = moment(remTime).format('mm:ss');
    // progress percentage report	!!!!!!!!!!
    const progress = 100 - (moment(remTime).format('mm') * 100) / 30;
    setProgress(progress);
    setCountDown(countDown);
  };

  return (
    <div id="progress-bar">
      <div style={{ width: '300px' }}>
        00:
        {countDown}
        {' '}
        Mins remaining
      </div>

      <Progress progress={progress} />

    </div>

  );
};

Timer.propTypes = {
  timer: PropTypes.any.isRequired,
  handleOnComplete: PropTypes.func.isRequired,
};

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Timer;
