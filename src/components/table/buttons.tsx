import React from 'react'
import {Button} from '@material-ui/core'
import { Add } from '@material-ui/icons';

export function ResetButton (props: any){
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
  
  export function AddButton (props: any){
       return (
    <Button
      variant="outlined"
      color="primary"
      onClick={props.addCells}
    >
      <Add />
    </Button>
  );
}