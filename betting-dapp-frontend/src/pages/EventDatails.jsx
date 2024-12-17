import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getContract } from '../utils/web3';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [outcome, setOutcome] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      const contract = getContract();
      const fetchedEvent = await contract.methods.events(id).call();
      setEvent({ ...fetchedEvent, id });
    };
    fetchEvent();
  }, [id]);

  const handleBet = async () => {
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    try {
      await contract.methods.placeBet(id, outcome).send({
        from: accounts[0],
        value: betAmount,
      });
      setMessage('Aposta realizada com sucesso!');
    } catch (err) {
      setMessage('Erro ao realizar aposta.');
    }
  };

  if (!event) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Detalhes do Evento</h1>
      <p>{event.description}</p>
      <h3>Resultados:</h3>
      {event.outcomes.map((out, idx) => (
        <p key={idx}>
          {idx}: {out} (Odds: {event.odds[idx]})
        </p>
      ))}
      <h3>Faça uma Aposta</h3>
      <div>
        <label>Valor da Aposta (em wei):</label>
        <input type="number" value={betAmount} onChange={(e) => setBetAmount(e.target.value)} />
      </div>
      <div>
        <label>Escolha o Resultado:</label>
        <input type="number" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
      </div>
      <button onClick={handleBet}>Apostar</button>
      <p>{message}</p>
    </div>
  );
};

export default EventDetails;
