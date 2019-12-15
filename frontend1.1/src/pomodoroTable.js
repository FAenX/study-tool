import React from 'react';
import Table from './cellsTable';

import Stats from "./stats";

class PomodoroTable extends React.Component {
	
	render (){
		return (
			<div>  
				<Stats />			
          		<Table  display={this.props.display}/>	
        	</div>
			);
	};
}

export default PomodoroTable;