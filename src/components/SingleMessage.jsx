import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const toDateTimeString = (timestamp) => {
    const date = new Date(timestamp);
    return date.getDate()+
    "/"+(date.getMonth()+1)+
    "/"+date.getFullYear()+
    " "+date.getHours()+
    ":"+date.getMinutes()+
    ":"+date.getSeconds()
}

const getColorFromPremiumType = (premiumType) => {
    switch(premiumType) {
        case 1:
            return 'red';
        case 2:
            return 'green';
        case 3:
            return 'blue'
        default:
            return '#959c97'
    }
}

export default function SingleMessage({ accountId, amount, isPremium, premiumType, message, timestamp, style }) {
  return (
    <Card sx={{ maxWidth: 600 }} style={style}>
      <CardContent style={{backgroundColor: getColorFromPremiumType(premiumType)}}>
        <Typography gutterBottom component="em">
            {toDateTimeString(timestamp / 1000000)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <strong>{accountId}</strong> <em>donate {amount / 1000000000000000000000000} Ⓝ</em>
        </Typography>
        </CardContent>
        <CardContent style={{backgroundColor: '#e3e3e3'}} >
        <Typography variant="body2" variant="h6" color="text.secondary">
            {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
