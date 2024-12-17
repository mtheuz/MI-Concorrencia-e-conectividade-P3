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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Criar Evento
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Descrição:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição do evento"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Resultados (separados por vírgula):
            </label>
            <input
              type="text"
              value={outcomes}
              onChange={(e) => setOutcomes(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Resultado 1, Resultado 2, ..."
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Odds (separadas por vírgula):</label>
            <input
              type="text"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1, 2, 3..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Criar Evento
          </button>
        </form>
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

export default CreateEvent;
