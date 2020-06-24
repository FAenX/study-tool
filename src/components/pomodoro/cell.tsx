import React from 'react'
import {
    Paper, Button, Toolbar, Card,
  } from '@material-ui/core';



export function Cell ({id, done}){
    const cardStyle={
      width: "40px",
      height: "40px",
      margin: ".25em",
      backgroundColor: done.includes(id)? "maroon" : "grey"
    }
    return (
      <Card   
        id ={id} 
        variant="elevation"
        elevation={5}
        style={cardStyle}
    />
    )
  }
  
  