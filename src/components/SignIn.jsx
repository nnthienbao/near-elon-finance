import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import elonImg from '../../assets/elon.png'

export default function SignIn({ signIn }) {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Typography variant="h3" gutterBottom component="div">
          Welcome to Elon Finance (ELOF)
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          Sign in to get free ELOF
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Button onClick={signIn} size='large' variant="contained">
          Login
        </Button>
      </Grid>
      <Grid item xs={3} style={{marginTop: 20}}>
        <img
          width={500}
          src={elonImg}
          alt="elon"
          loading="lazy"
        />
      </Grid>
    </Grid>
  );
}
