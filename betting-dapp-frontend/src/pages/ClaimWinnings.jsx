import React, { useState } from 'react';
import { getContract } from '../utils/web3';

const ClaimWinnings = () => {
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');

  const handleClaim = async () => {
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    try {
      await contract.methods.claimWinnings(eventId).send({ from: accounts[0] });
      setMessage('Ganhos reivindicados com sucesso!');
    } catch (err) {
      setMessage('Erro ao reivindicar os ganhos.');
    }
  };

  return (
    <div>
      <h1>Reivindicar Ganhos</h1>
      <div>
        <label>ID do Evento:</label>
        <input type="number" value={eventId} onChange={(e) => setEventId(e.target.value)} />
      </div>
      <button onClick={handleClaim}>Reivindicar</button>
      <p>{message}</p>
    </div>
  );
};

export default ClaimWinnings;
