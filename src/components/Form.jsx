import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendIcon from "@mui/icons-material/Send";
import IconButton from '@mui/material/IconButton';
import CopyButton from '@mui/icons-material/CopyAll';
import SendDialog from "./SendDialog";
import ClaimDialog from "./ClaimDialog"

export default function Form({ contract, onSubmit, currentUser }) {
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  return (
    <>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Balance
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: 30 }}>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          1000 ELOF
        </Typography>
      </Grid>
      <Grid item item style={{ marginTop: 30 }}>
        <TextField
          disabled
          size="small"
          id="outlined-disabled"
          label="Account ID"
          defaultValue="nnthienbao.testnet"
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <CopyButton />
              </IconButton>
            ),
          }}
        />
      </Grid>
      <Grid item style={{ marginTop: 40 }}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() =>setOpenSendDialog(true)} variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
          <Button variant="outlined" startIcon={<ReceiptIcon />}>
            Receive
          </Button>
          <Button onClick={() =>setOpenClaimDialog(true)} variant="outlined" startIcon={<ReceiptIcon />}>
            Claim
          </Button>
        </Stack>
      </Grid>
    </Grid>
    <SendDialog open={openSendDialog} setOpen={setOpenSendDialog} />
    <ClaimDialog open={openClaimDialog} setOpen={setOpenClaimDialog} />
    </>
  );
}
