import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Big from 'big.js';

export default function Form({ contract, onSubmit, currentUser }) {
  const [isSign, setIsSign] = useState([]);
  useEffect(() => {
    // TODO: don't just fetch once: isSign
    contract.checkIsSign({accountId: currentUser.accountId}).then(setIsSign);
  }, []);
  return (
    !isSign ?
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign the guest book, { currentUser.accountId }!</p>
        <p className="highlight">
          <label htmlFor="message">Message:</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
        </p>
        <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <p>
          <label htmlFor="theme">Theme (Premium only):</label>
          <select className="form-select" defaultValue='0'>
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </p>
        <button type="submit">
          Sign
        </button>
      </fieldset>
    </form>
    : <p>Is Sign {currentUser.accountId}</p>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired
  })
};
