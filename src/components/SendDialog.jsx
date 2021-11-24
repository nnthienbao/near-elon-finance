import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function SendDialog({open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Send ELOF</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please make sure the information below is correct
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="receiveAddress"
          label="Receive Address"
          type="input"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}
