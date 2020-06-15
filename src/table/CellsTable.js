import React, { useState, useEffect } from 'react';
import Cell from "./Cell";
import Timer from "./Timer";
import {Paper, Button, Toolbar, Card} from "@material-ui/core"
import "./CellsTable.scss"
import AlertOnComplete from "../components/AlertOnComplete"
import PropTypes from "prop-types"
import {Add} from "@material-ui/icons"

const ProgressBlip =props=>{
	const progress = {
		backgroundColor: "#002329", 
		width: "20px",
		height: "20px",		
		borderRadius: "50%",
	}
	
	return (
		<Card 
			variant="elevation" 
			elevation={5}
			style={progress}
			className="progress"
		>
			
		</Card>
	)
}

const makeList = (num) => {
    let list = [];
    for (let i = 0; i < num; i++){
        list.push(i);
    }
    return list;
}

const ResetButton =props=>(
	<Button 
		variant="outlined" 
		color="primary" 
		onClick={props.handleTableReset}>
			reset
	</Button>

)

const AddButton =(props)=>(
	<Button 
		variant="outlined" 
		color="primary" 
		onClick={props.addCells}>
			<Add/>
	</Button>
)


const Table =props=> {
	useEffect(()=>{
		// request permission on page load
		document.addEventListener('DOMContentLoaded', function () {
			if (!Notification) {
			alert('Desktop notifications not available in your browser. Try Chromium.'); 
			return;
			}
		
			if (Notification.permission !== "granted")
			Notification.requestPermission();
		});

	
	})

	const notifyMe=()=> {
		if (Notification.permission !== "granted")
		  Notification.requestPermission();
		else {
		  new Notification('Study tool', {
			icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
			body: "Congrats! Another circle done!!!",
		  });	  
		}
	  
	  }

	const [active, setActive] = useState(false)
	const [cellID, setCellID] = useState("")
	const [timer, setTimer] = useState("")
	const [alert, setAlert] = useState(false)
	//update state from cell click
	const handleCellClick = (ID, then)=> {  
		setCellID(ID)
		setActive(true)
		setTimer(then)
	} 	

	const handleOnComplete=()=>{
		props.addToCompleted(cellID)
		setActive(false)
		setCellID(false)
		setTimer(false)
		//
		notifyMe()
		setAlert(true)
		
	}
	return (		
			<Paper
				variant="outlined" 					  
				className="pomodoro-table"
			> 
			<Toolbar>					  
				<AddButton addCells={props.addCells}/>
				<ResetButton handleTableReset={props.handleTableReset}/>
				<ProgressBlip />					
			</Toolbar>
			<div className="cells">
				{makeList(props.cells).map(i => {
					return <Cell number={i} 
							activeCell={cellID}
							key={i} 
							clickHandler={handleCellClick} 
							tableActive={active} 
							completed={props.completed}
						/>
				})}
			</div>
			<Timer 
				handleOnComplete={handleOnComplete} 
				active={active} 
				timer={timer}
			/>
			<AlertOnComplete 
				open={alert} 
				handleClose={()=>setAlert(false)}				
			/>
			<button onClick={notifyMe}>Notify me!</button>
		</Paper>
		);

}

Table.propTypes={
	completed: PropTypes.array.isRequired,
	handleTableReset: PropTypes.func.isRequired,
	cells: PropTypes.number.isRequired,
	addCells: PropTypes.func.isRequired

}

export default Table;




