// src/components/Wallet.js
import React, { useState, useEffect, useCallback } from 'react';
import WalletKeyManager from '../utils/WalletKeyManager';
import Web3Provider from '../services/Web3Provider';
import { NETWORKS } from '../config/networks';

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [balance] = useState('0'); // Fixed: removed setBalance since it's not used
  const keyManager = new WalletKeyManager();
  const web3Provider = new Web3Provider();

  // Fixed: wrapped in useCallback to fix the dependency warning
  const initializeWallet = useCallback(async () => {
    try {
      // Initialize Web3 provider
      await web3Provider.initProvider(selectedNetwork);
      
      // For demo purposes, create a sample wallet
      const newWallet = keyManager.generateWallet();
      setWallet(newWallet);
      
      console.log('Wallet initialized successfully');
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  }, [selectedNetwork]); // Added dependencies

  useEffect(() => {
    initializeWallet();
  }, [initializeWallet]); // Fixed: added missing dependency

  const handleNetworkSwitch = async (networkKey) => {
    try {
      setSelectedNetwork(networkKey);
      await web3Provider.initProvider(networkKey);
      console.log(`Switched to ${networkKey} network`);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>DApp Wallet</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Network Selection</h3>
        {Object.keys(NETWORKS).map(networkKey => (
          <button
            key={networkKey}
            onClick={() => handleNetworkSwitch(networkKey)}
            style={{
              marginRight: '10px',
              padding: '8px 15px',
              backgroundColor: selectedNetwork === networkKey ? '#007bff' : '#f8f9fa',
              color: selectedNetwork === networkKey ? 'white' : 'black',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {NETWORKS[networkKey].chainName}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Wallet Info</h3>
        <p><strong>Current Network:</strong> {NETWORKS[selectedNetwork].chainName}</p>
        <p><strong>Balance:</strong> {balance} {NETWORKS[selectedNetwork].nativeCurrency.symbol}</p>
        {wallet && (
          <p><strong>Address:</strong> 0x742d35Cc6B9e0F0FE1C4A0F8746c5e8e8B0Ff (Demo)</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
