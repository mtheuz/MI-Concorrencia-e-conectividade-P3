import React, { useState, useEffect } from 'react';
import { getContract } from '../utils/web3';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [account, setAccount] = useState(''); // Estado para armazenar a conta conectada

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

    const fetchAccount = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]); // Armazena a primeira conta conectada
        } else {
          setAccount('Nenhuma conta conectada.');
        }
      } catch (err) {
        setAccount('Erro ao buscar a conta.');
      }
    };

    fetchEvents();
    fetchAccount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Eventos de Apostas</h1>

        {/* Exibe a conta conectada */}
        <div className="mb-6 text-center text-gray-600">
          <p>
            <strong>Conta Conectada:</strong>{' '}
            <span className="text-blue-500">{account}</span>
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="space-y-4">
          {events.length === 0 && (
            <p className="text-gray-500 text-center">Nenhum evento disponível.</p>
          )}

          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 p-4 rounded-md shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700">{event.description}</h2>
              <p className="text-gray-600 mt-1">
                Status:{' '}
                <span
                  className={`font-medium ${
                    event.isClosed ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {event.isClosed ? 'Fechado' : 'Aberto'}
                </span>
              </p>
              <div className="mt-3">
                <Link
                  to={`/event/${event.id}`}
                  className="inline-block text-blue-500 hover:underline"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/create">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow">
              Criar Novo Evento
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
