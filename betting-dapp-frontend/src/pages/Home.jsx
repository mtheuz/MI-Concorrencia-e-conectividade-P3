import React, { useState, useEffect } from 'react';
import { getContract } from '../utils/web3';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const contract = getContract();
        const eventCount = await contract.methods.eventCount().call();
        const eventsList = [];
        for (let i = 0; i < eventCount; i++) {
          const event = await contract.methods.events(i).call();
          eventsList.push({ ...event, id: i });
        }
        setEvents(eventsList);
      } catch (err) {
        setError('Erro ao carregar os eventos.');
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Eventos de Apostas</h1>
      {error && <p>{error}</p>}
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.description}</h2>
          <p>Status: {event.isClosed ? 'Fechado' : 'Aberto'}</p>
          <Link to={`/event/${event.id}`}>Ver Detalhes</Link>
        </div>
      ))}
      <Link to="/create">
        <button>Criar Novo Evento</button>
      </Link>
    </div>
  );
};

export default Home;
