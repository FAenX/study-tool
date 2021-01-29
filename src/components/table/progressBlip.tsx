import React from 'react'
import {Card } from '@material-ui/core'


export function ProgressBlip() {
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
  