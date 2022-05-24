import Web3 from 'web3'
import SToken from '../build/contracts/SToken.json';
import STokenSale from '../build/contracts/STokenSale.json';
const contract = require('@truffle/contract');

export const load = async() => {
    await loadWeb3();
    const account = await loadAccount();
    const { contractST, contractSTS } = await loadContracts();
    const { ethFunds, transactionCount, tokensSold, ethPriceN, transactions } = await loadVariables(contractSTS);
    const bal = await contractST.balanceOf(account);
    const myST = bal / 10**18;
    return { account, contractSTS, contractST, ethFunds, transactionCount, tokensSold, ethPriceN, transactions, myST };
};


const loadVariables = async (contractSTS) => {
    const admin = "0x87823C02643cDd53c758F2C1057A0c4AA283f85b";
    const ethFunds = await window.web3.eth.getBalance(admin);

    const tCount = await contractSTS.transactionCount();
    const transactionCount = tCount.toNumber();

    const tSold = await contractSTS.tokensSold();
    const tokensSold = window.web3.utils.fromWei(tSold, 'ether');

    const ethPrice = await contractSTS.getETHPrice();
    const ethPriceN = ethPrice.toNumber();

    // Make this strange for loop to get the last 10 transactions.
    const transactions = [];
    var j = 0;
    for (var i = transactionCount - 1; i >= 0 && j < 10; i--) {
        const t = await contractSTS.transaction(i);
        j++;
        transactions.push(t);
    }

    return { ethFunds, transactionCount, tokensSold, ethPriceN, transactions };
};

const loadContracts = async () => {
    const STContract = contract(SToken);
    STContract.setProvider(window.web3.currentProvider);
    const STSContract = contract(STokenSale);
    STSContract.setProvider(window.web3.currentProvider);

    const contractST = await STContract.deployed();
    const contractSTS = await STSContract.deployed();

    return { contractST, contractSTS };
};

const loadAccount = async () => {
    const account = window.web3.eth.getCoinbase();
    return account;
};

const loadWeb3 = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({/* ... */});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};