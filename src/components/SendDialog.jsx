import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Big from 'big.js';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default function SendDialog({open, setOpen, contract, currentUser}) {
  const [receiveAddress, setReceiveAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const handleClose = () => {
    setOpen(false);
  }

  const send = () => {
    contract.ft_transfer({receiver_id: receiveAddress, amount: amount}, BOATLOAD_OF_GAS, Big('0.000000000000000000000001').times(10 ** 24).toFixed()).then(res => {
      console.log('Send done');
    })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Send ELOF</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please make sure the information below is correct
        </DialogContentText>
        <TextField
          onChange={e => setReceiveAddress(e.target.value)}
          autoFocus
          margin="dense"
          id="receiveAddress"
          label="Receive Address"
          type="input"
          fullWidth
          variant="standard"
          helperText="The recipient's address needs to be registered"
        />
        <TextField
          onChange={e => setAmount(e.target.value)}
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
        <Button onClick={send}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}
