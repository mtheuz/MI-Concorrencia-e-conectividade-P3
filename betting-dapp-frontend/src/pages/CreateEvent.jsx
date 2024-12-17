import React, { useState } from 'react';
import { getContract } from '../utils/web3';

const CreateEvent = () => {
  const [description, setDescription] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [odds, setOdds] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    try {
      const outcomesArray = outcomes.split(',').map((item) => item.trim());
      const oddsArray = odds.split(',').map((item) => parseInt(item.trim(), 10));

      await contract.methods.createEvent(description, outcomesArray, oddsArray).send({
        from: accounts[0],
      });
      setMessage('Evento criado com sucesso!');
    } catch (err) {
      setMessage('Erro ao criar o evento.');
    }
  };

  return (
    <div>
      <h1>Criar Evento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Resultados (separados por vírgula):</label>
          <input type="text" value={outcomes} onChange={(e) => setOutcomes(e.target.value)} required />
        </div>
        <div>
          <label>Odds (separados por vírgula):</label>
          <input type="text" value={odds} onChange={(e) => setOdds(e.target.value)} required />
        </div>
        <button type="submit">Criar Evento</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateEvent;
