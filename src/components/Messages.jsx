import React from 'react';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import SingleMessage from './SingleMessage';

export default function Messages({ messages }) {
  return (
    <Container sx={{ width: 600 }}>
      <Typography gutterBottom variant="h5" component="div">
        <strong>Messages</strong>
      </Typography>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <SingleMessage
          style={{marginTop: 12}}
          key={i}
          accountId={message.sender}
          amount={message.amount}
          isPremium={message.premium}
          premiumType={message.premiumType}
          message={message.text}
          timestamp={message.timestamp}  />
      )}
    </Container>
  );
}