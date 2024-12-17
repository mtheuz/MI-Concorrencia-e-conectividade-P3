import React, { useState, useEffect } from 'react';
import { getContract } from '../utils/web3';

const CloseEvent = () => {
  const [eventId, setEventId] = useState('');
  const [winningOutcome, setWinningOutcome] = useState('');
  const [message, setMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const contract = getContract();
      const eventCount = await contract.methods.eventCount().call();
      const eventsList = [];
      for (let i = 0; i < eventCount; i++) {
        const event = await contract.methods.events(i).call();
        if (!event.isClosed) {
          eventsList.push({ ...event, id: i });
        }
      }
      setEvents(eventsList);
    };
    fetchEvents();
  }, []);

  const handleCloseEvent = async () => {
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    try {
      await contract.methods.closeEvent(eventId, winningOutcome).send({ from: accounts[0] });
      setMessage('Evento fechado com sucesso!');
    } catch (err) {
      setMessage('Erro ao fechar o evento.');
    }
  };

  return (
    <div>
      <h1>Fechar Evento</h1>
      <div>
        <label>Evento:</label>
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">Selecione um evento</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.description}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Resultado Vencedor:</label>
        <input type="number" value={winningOutcome} onChange={(e) => setWinningOutcome(e.target.value)} />
      </div>
      <button onClick={handleCloseEvent}>Fechar Evento</button>
      <p>{message}</p>
    </div>
  );
};

export default CloseEvent;
