import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import moment from 'moment';
import './Cell.scss';

export default function Cell(props) {
  const handleClick = (event) => {
    event.preventDefault();
    if (props.completed.includes(props.number) || props.tableActive === true) {

    } else if (!props.completed.includes(props.number) && props.tableActive === false) {
      const now = moment();
      props.clickHandler(props.number, now);
    }
  };

  const checkColor = () => {
    try {
      if (props.completed !== null && props.completed.includes(props.number)) {
        return 'maroon';
      }
      if (props.activeCell === props.number) {
        return 'green';
      }
      return 'grey';
    } catch {}
  };

  const cardStyle = {
    backgroundColor: checkColor(),
  };

  return (
    <div className="card">
      <Card
        variant="elevation"
        elevation={5}
        id={props.number}
        className="p-1"
        style={cardStyle}
        onClick={handleClick}
      />

      {/* {this.props.number}  */}
    </div>
  );
}
