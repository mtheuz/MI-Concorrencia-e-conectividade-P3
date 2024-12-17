import Web3 from 'web3';
import Betting from '../abi';

let web3;
let contract;

export const initializeWeb3 = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Betting.networks[networkId];
    contract = new web3.eth.Contract(Betting.abi, deployedNetwork.address);
  } else {
    console.error('Metamask não encontrada.');
  }
};

export const getContract = () => contract;
