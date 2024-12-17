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

  if (!event) return <p className="text-center text-gray-600 mt-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Detalhes do Evento
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">{event.description}</p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Resultados:</h3>
          <ul className="space-y-2">
            {event.outcomes.map((out, idx) => (
              <li
                key={idx}
                className="bg-gray-200 px-4 py-2 rounded-md flex justify-between text-gray-700"
              >
                <span>
                  <strong>Resultado {idx}:</strong> {out}
                </span>
                <span className="text-blue-600 font-semibold">Odds: {event.odds[idx]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-300 pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Faça uma Aposta</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Valor da Aposta (em wei):
              </label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 1000000000000000"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Escolha o Resultado:
              </label>
              <input
                type="number"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o número do resultado"
              />
            </div>
            <button
              onClick={handleBet}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apostar
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
      </div>
    </div>
  );
};

export default EventDetails;
