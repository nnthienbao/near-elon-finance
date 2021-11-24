import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import CopyButton from "@mui/icons-material/CopyAll";
import SendDialog from "./SendDialog";
import ClaimDialog from "./ClaimDialog";
import Big from "big.js";
import { useSnackbar } from 'notistack';
import elonImg from "../../assets/elon.png";

const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

export default function Form({ contract, currentUser }) {
  const { enqueueSnackbar } = useSnackbar();

  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [openClaimDialog, setOpenClaimDialog] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [amount, setAmount] = useState(-1);
  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract
      .ft_is_register({ account_id: currentUser.accountId })
      .then((isRegister) => {
        setIsRegister(isRegister);
        if (isRegister) {
          getBalance();
        }
      });
  }, []);

  const getBalance = () => {
    contract
      .ft_balance_of({ account_id: currentUser.accountId })
      .then((amount) => {
        setAmount(amount);
      });
  };

  const onRegister = () => {
    contract
      .storage_deposit(
        {},
        BOATLOAD_OF_GAS,
        Big("0.00125")
          .times(10 ** 24)
          .toFixed()
      )
      .then((res) => {
        console.log("Register done");
      });
  };

  const copyAccountIdToClipboard = () => {
    navigator.clipboard.writeText(currentUser.accountId);
    enqueueSnackbar('Address has been copied to clipboard', {variant: 'success'})
  };

  const onClaimSuccess = () => {
    enqueueSnackbar('Claim success', {variant: 'success'})
  }

  return (
    <>
      {isRegister ? (
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
              {amount} ELOF
            </Typography>
          </Grid>
          <Grid item item style={{ marginTop: 30 }}>
            <TextField
              disabled
              size="small"
              id="outlined-disabled"
              label="Account ID"
              defaultValue={currentUser.accountId}
              InputProps={{
                endAdornment: (
                  <IconButton
                    size="small"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={copyAccountIdToClipboard}
                  >
                    <CopyButton />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item style={{ marginTop: 40 }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => setOpenSendDialog(true)}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
              <Button
                onClick={copyAccountIdToClipboard}
                variant="outlined"
                startIcon={<ReceiptIcon />}
              >
                Receive
              </Button>
              <Button
                onClick={() => setOpenClaimDialog(true)}
                variant="outlined"
                startIcon={<ReceiptIcon />}
              >
                Claim
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={3} style={{ marginTop: 20 }}>
            <img width={500} src={elonImg} alt="elon" loading="lazy" />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Sorry, you haven't registered yet, click the button below to
              register
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: 20 }}>
            <Button
              onClick={onRegister}
              variant="outlined"
              startIcon={<ReceiptIcon />}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={3} style={{ marginTop: 20 }}>
            <img width={500} src={elonImg} alt="elon" loading="lazy" />
          </Grid>
        </Grid>
      )}
      <SendDialog
        open={openSendDialog}
        setOpen={setOpenSendDialog}
        contract={contract}
        currentUser={currentUser}
      />
      <ClaimDialog
        open={openClaimDialog}
        setOpen={setOpenClaimDialog}
        contract={contract}
        currentUser={currentUser}
        getBalance={getBalance}
        onClaimSuccess={onClaimSuccess}
      />
    </>
  );
}
