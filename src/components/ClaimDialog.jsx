import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function ClaimDialog({
  open,
  setOpen,
  contract,
  currentUser,
  getBalance,
  onClaimSuccess,
}) {
  const [amountClaim, setAmountClaim] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const claim = () => {
    setIsWaiting(true);
    contract
      .ft_mint({ receiver_id: currentUser.accountId, amount: amountClaim })
      .then((res) => {
        getBalance();
        handleClose();
        onClaimSuccess();
        setIsWaiting(false);
        setAmountClaim(0);
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Claim free ELOF</DialogTitle>
      <DialogContent>
        <TextField
          value={amountClaim}
          onChange={(e) => setAmountClaim(e.target.value)}
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="standard"
          helperText="Max is 1000 ELOF"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={isWaiting} onClick={claim}>
          {
            !isWaiting
          ? 'Claim'
          : 'Claiming'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
