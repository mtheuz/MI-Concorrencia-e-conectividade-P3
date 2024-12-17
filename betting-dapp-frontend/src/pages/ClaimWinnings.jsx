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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Reivindicar Ganhos</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ID do Evento:</label>
          <input
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            placeholder="Digite o ID do evento"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleClaim}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Reivindicar
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes('sucesso') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClaimWinnings;
