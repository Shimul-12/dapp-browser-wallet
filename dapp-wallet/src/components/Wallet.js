// src/components/Wallet.js
import React, { useState, useEffect, useCallback } from 'react';
import { NETWORKS } from '../config/networks';

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [balance] = useState('0.0');

  // Initialize wallet function
  const initializeWallet = useCallback(async () => {
    try {
      // For demo purposes, create a sample wallet
      const demoWallet = {
        address: '0x742d35Cc6B9e0F0FE1C4A0F8746c5e8e8B0Ff',
        privateKey: 'demo-key-encrypted'
      };
      setWallet(demoWallet);
      
      console.log('Wallet initialized successfully');
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
    }
  }, []);

  useEffect(() => {
    initializeWallet();
  }, [initializeWallet]);

  const handleNetworkSwitch = async (networkKey) => {
    try {
      setSelectedNetwork(networkKey);
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
          <p><strong>Address:</strong> {wallet.address}</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Quick Actions</h3>
        <button 
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Send functionality will be implemented')}
        >
          Send
        </button>
        <button 
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Receive functionality will be implemented')}
        >
          Receive
        </button>
      </div>
    </div>
  );
};

export default Wallet;
