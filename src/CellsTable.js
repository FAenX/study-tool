import React, { useState } from 'react';
import Cell from "./Cell";
import Timer from "./Timer";
import {Paper, Button, Toolbar} from "@material-ui/core"
import "./CellsTable.scss"
import AlertOnComplete from "./components/AlertOnComplete"
import PropTypes from "prop-types"

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


const Table =props=> {
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
		setAlert(true)
	}
	return (		
			<Paper
				variant="outlined" 					  
				className="pomodoro-table"
			> 
			<Toolbar>					  
				<Button variant="outlined" color="primary">Refresh</Button>
				<ResetButton handleTableReset={props.handleTableReset}/>					
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
		</Paper>
		);

}

Table.propTypes={
	completed: PropTypes.array.isRequired,
	handleTableReset: PropTypes.func.isRequired,
	cells: PropTypes.number.isRequired

}

export default Table;