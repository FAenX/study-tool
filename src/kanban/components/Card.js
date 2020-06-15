import React, { useEffect, useState } from "react"
import {Card} from "@material-ui/core"

const TaskList =props=>{

    const cardWidth=()=>{
        if (props.positionY > 50){
           return "250px"
        }
        return "62px"
    }
    const cardHeight=()=>{
        if (props.positionY > 50){
           return "300px"
        }
        return "75px"
    }
    const taskListStyle ={
        width: cardWidth(),
        height: cardHeight(),
        margin: ".5em",
        transition: "width 1s, height 1s"
    }
    return (
        <Card 
            variant="elevation" 
            elevation={5} 
            style={taskListStyle}>

        </Card>
    )
}

export default TaskList;