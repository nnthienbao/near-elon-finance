import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    contract.getMessages().then(setMessages);
  }, []);

  const onSubmit = (params, setIsSign) => {
    console.log('onSubmit')
    const {message, donation, premiumType} = params;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract.addMessage(
      { text: message, premiumType: premiumType },
      BOATLOAD_OF_GAS,
      Big(donation || '0').times(10 ** 24).toFixed()
    ).then(() => {
      contract.getMessages().then(messages => {
        setMessages(messages);
        setIsSign(true)
      });
    });
  };

  const signIn = () => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR Guest Book'
    );
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h3>NEAR Guest Book</h3>
          </Typography>
          { currentUser
            ? <Button color="inherit" onClick={signOut}>Logout</Button>
            : <Button color="inherit" onClick={signIn}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
    <div style={{marginTop: 20}}>
    { currentUser
      ? <Form contract={contract} onSubmit={onSubmit} currentUser={currentUser} />
      : <SignIn signIn={signIn} />
    }
    </div>
    <div style={{marginTop: 20}}>
    { !!currentUser && !!messages.length && <Messages messages={messages}/> }
    </div>
    </>
    // <main>
    //   <header>
    //     <h1>NEAR Guest Book</h1>
    //     { currentUser
    //       ? <button onClick={signOut}>Log out</button>
    //       : <button onClick={signIn}>Log in</button>
    //     }
    //   </header>
    //   { currentUser
    //     ? <Form contract={contract} onSubmit={onSubmit} currentUser={currentUser} />
    //     : <SignIn/>
    //   }
    //   { !!currentUser && !!messages.length && <Messages messages={messages}/> }
    // </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }).isRequired
};

export default App;
