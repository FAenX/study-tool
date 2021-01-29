import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';


const AlertDialog=props=> {
  
  return (
    
      <Dialog
        open={props.open}
        keepMounted
        onClose={props.handleClose}
      >
        <DialogTitle >Done</DialogTitle>
            
      </Dialog>
    
  );
}

export default AlertDialog
