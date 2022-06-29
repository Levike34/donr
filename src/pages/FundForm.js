import '../App.css';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import getWeb3 from '../getWeb3dos.js';
import { ethers } from "ethers";

function FundForm() {
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();
  const [reason, setReason] = useState();
  const [provider, setProvider] = useState();
  const [godonor, setGodonor] = useState();
  const [accounts, setAccounts] = useState();

  useEffect(() => {
   connect()
 
  }, []);

  async function connect() {
    let godonorABI = [
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_donor",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
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
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balanceRaised",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountRaised",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "targetAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startBlock",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endBlock",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "disperseFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "donateAsDonor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "donor",
        "outputs": [
          {
            "internalType": "contract Donor",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "fundStarted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "getById",
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
        "name": "id",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "onGoingFunds",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
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
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "owners",
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
            "internalType": "uint256",
            "name": "_divisor",
            "type": "uint256"
          }
        ],
        "name": "setFeePercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_amountToRaise",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_daysToRaise",
            "type": "uint256"
          }
        ],
        "name": "startFundMe",
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
      },
      {
        "stateMutability": "payable",
        "type": "receive"
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
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      godonorABI,
      provider
    );

    setAccounts(accounts);
    setProvider(provider);
    setGodonor(godonor);
  }

 async function startFund() {
  //  let realAmount = ethers.utils.formatUnits(amount, 'ether');
    const signer = await provider.getSigner();
    const godonorWithSigner = await godonor.connect(signer);
    let tx = await godonorWithSigner.startFundMe(amount, duration, {gasLimit: 200000});
    console.log(tx);
  }
  
  async function donate() {
    //let realAmount = ethers.utils.formatUnits(amount, 'ether');
    let tx = await godonor.donate(amount);
    console.log(tx);
  }


  function handleInputChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setAmount(value);
  }
  function handleInputChangeDuration(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setDuration(value);
  }

  function handleInputChangeReason(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setReason(value);
  }
  return (
    <div className="App">

      <header className="App-header">
        <h1>Go Donor</h1>
        <Link to='/'> <button  >Home</button> </Link>
        <div className='column'>
          <p>Amount to raise in DONOR:</p><br></br>
            <input className='input-form' value={amount} onChange={handleInputChange} placeholder='Amount'/>
            <p>Days to raise (funds only release after the deadline!):</p><br></br>
            <input className='input-form' value={duration} onChange={handleInputChangeDuration} placeholder='Duration' />
            <p>Please tell us the reason for raising funds:</p><br></br>
            <input className='input-form-reason' value={reason} onChange={handleInputChangeReason} placeholder='Reason' />
            <button onClick={startFund}>Submit</button>
        </div>
      
        
      </header>
    </div>
  );
}

export default FundForm;
