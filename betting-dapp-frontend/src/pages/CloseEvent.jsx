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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Fechar Evento</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Evento:</label>
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um evento</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.description}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Resultado Vencedor:</label>
          <input
            type="number"
            value={winningOutcome}
            onChange={(e) => setWinningOutcome(e.target.value)}
            placeholder="Digite o número do resultado"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleCloseEvent}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Fechar Evento
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

export default CloseEvent;
