import React, { useState, useEffect } from 'react';
import {
  Paper, Button, Toolbar, Card,
} from '@material-ui/core';

import './CellsTable.scss';
import { Add } from '@material-ui/icons';
import Timer from './timer';
import Cell from './Cell';
import AlertOnComplete from './AlertOnComplete';
import cell from '../../store/reducers/cellReducer'
import { connect } from "react-redux";

const cells = connect(cell)(Table)

function ProgressBlip() {
  const progress = {
    backgroundColor: '#002329',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
  };

  return (
    <Card
      variant="elevation"
      elevation={5}
      style={progress}
      className="progress"
    />
  );
}

const makeList = (num) => {
  const list = [];
  for (let i = 0; i < num; i += 1) {
    list.push(i);
  }
  return list;
};

const ResetButton = (props) => {
  const { handleTableReset } = props;
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleTableReset}
    >
      reset
    </Button>
  );
};

const AddButton = (props: any) => (
  <Button
    variant="outlined"
    color="primary"
    onClick={props.addCells}
  >
    <Add />
  </Button>
);

export default function Table(props: any) {
  console.log(cells)
  useEffect(() => {
    // request permission on page load
    document.addEventListener('DOMContentLoaded', () => {
      if (!Notification) {
        return;
      }

      if (Notification.permission !== 'granted') Notification.requestPermission();
    });
  });

  const notifyMe = () => {
    if (Notification.permission !== 'granted') { Notification.requestPermission(); } else {
		  new Notification('Study tool', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: 'Congrats! Another circle done!!!',
		  });
    }
	  };

  const [active, setActive] = useState(false);
  const [cellID, setCellID] = useState(null);
  const [clickedTime, setClickedTime] = useState(null);
  const [alert, setAlert] = useState(false);
  
  // update state from cell click
  const handleCellClick = (ID: number | null, clickedTime: string | null) => {
    setCellID(ID);
    setActive(true);
    setClickedTime(clickedTime);
  };

  const handleOnComplete = () => {
    props.addToCompleted(cellID);
    setActive(false);
    setCellID(null);
    setClickedTime(null);
    //
    notifyMe();
    setAlert(true);
  };
  return (
    <Paper
      variant="outlined"
      className="pomodoro-table"
    >
      <Toolbar>
        <AddButton addCells={props.addCells} />
        <ResetButton handleTableReset={props.handleTableReset} />
        <ProgressBlip />
      </Toolbar>
      <div className="cells">
        {makeList(props.cells).map((i) => (
          <Cell
            number={cell}
            activeCell={cellID}
            key={i}
            clickHandler={handleCellClick}
            tableActive={active}
            completed={props.completed}
          />
         ))} 
      </div>
      <Timer
        handleOnComplete={handleOnComplete}
        clickedTime={clickedTime}
      />
      <AlertOnComplete
        open={alert}
        handleClose={() => setAlert(false)}
      />
      <button onClick={notifyMe}>Notify me!</button>
    </Paper>
  );
}

