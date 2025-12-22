// src/services/Web3Provider.js
import Web3 from 'web3';
import { NETWORKS } from '../config/networks';

class Web3Provider {
  constructor() {
    this.web3 = null;
    this.currentNetwork = 'ethereum';
    this.accounts = [];
  }

  async initProvider(networkKey = 'ethereum') {
    const network = NETWORKS[networkKey];
    this.web3 = new Web3(network.rpcUrls[0]);
    this.currentNetwork = networkKey;
  }

  createWeb3Provider() {
    const provider = {
      isMetaMask: true, // For DApp compatibility
      chainId: NETWORKS[this.currentNetwork].chainId,
      
      request: async ({ method, params }) => {
        switch (method) {
          case 'eth_requestAccounts':
            return this.requestAccountAccess();
          case 'eth_sendTransaction':
            return this.sendTransaction(params[0]);
          case 'wallet_switchEthereumChain':
            return this.switchNetwork(params[0].chainId);
          case 'eth_accounts':
            return this.accounts;
          default:
            if (this.web3.eth[method]) {
              return await this.web3.eth[method](...params);
            }
            throw new Error(`Method ${method} not supported`);
        }
      },

      on: (event, callback) => {
        // Event handling implementation
        console.log(`Event listener added for: ${event}`);
      }
    };

    return provider;
  }

  async requestAccountAccess() {
    // Return wallet addresses
    return this.accounts;
  }

  async sendTransaction(transactionObject) {
    try {
      // Validate transaction
      this.validateTransaction(transactionObject);
      
      // In a real wallet, show approval dialog here
      console.log('Transaction to approve:', transactionObject);
      
      // For demo purposes, we'll just log
      return '0x' + Date.now().toString(16); // Fake transaction hash
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  validateTransaction(tx) {
    if (!tx.to) throw new Error('Missing recipient address');
    if (!tx.value && !tx.data) throw new Error('Empty transaction');
  }

  async switchNetwork(chainId) {
    const network = Object.values(NETWORKS).find(n => n.chainId === chainId);
    if (!network) throw new Error('Unsupported network');
    
    const networkKey = Object.keys(NETWORKS).find(key => NETWORKS[key].chainId === chainId);
    await this.initProvider(networkKey);
    
    return null;
  }
}

export default Web3Provider;
