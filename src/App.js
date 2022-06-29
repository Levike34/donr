import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import getWeb3 from './getWeb3dos';
import { ethers } from 'ethers';

function App() {
  const [goDonor, setGodonor] = useState();
  const [web3, setWeb3] = useState();
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    connect();
  }, [])

  async function connect() {
    let godonorABI = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

   // let web3 = await getWeb3();

    let accounts = await provider.send("eth_requestAccounts", []);;

    let godonor = new ethers.Contract(
      "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
      godonorABI,
      provider
    );

    setAccounts(accounts);
    setGodonor(godonor);
  }



function startFund() {}
  
function donate() {}

  return (
    <div className="App">
      <header className="App-header">
  
        <h1>Go Donor</h1>
        <div className='column'>
        <p>Go Donor is bringing crowdfunding to the next level.
          With Go Donor, everyone is guaranteed to receive their funds raised
          without interference from third-parties.  All funds are handled by 
          smart contracts and will disburse accordingly via DONOR, our native token.
        </p>
        <p>How it works:  Users connect their wallet and fill out a form explaining what
          they need funds for and how they want to use them.  Funds are then raised anonymously
          until the time limit has been reached or the target amount has been satisfied; then the funds
          are disbursed as DONOR.
        </p>
        <p>DONOR is a crowdsourcing token which gives holders the ability to raise $BUSD just by holding.
          All funds donated and raised will utilize DONOR either directly or in the background.
        </p>
        </div>
        <Link to='fund-form'> <button onClick={startFund} >Get Started</button> </Link>
        <Link to='search'> <button onClick={startFund} >Search</button> </Link>
        <Link to='me'> <button >My Page</button> </Link>
        
      </header>
    </div>
  );
}

export default App;
