// src/App.js
import React, { useState } from 'react';
import './App.css';
import Wallet from './components/Wallet';
import DAppBrowser from './components/DAppBrowser';

function App() {
  const [currentView, setCurrentView] = useState('wallet');

  return (
    <div className="App">
      <nav style={{ 
        padding: '10px', 
        borderBottom: '2px solid #ccc', 
        marginBottom: '20px',
        backgroundColor: '#f8f9fa'
      }}>
        <button
          onClick={() => setCurrentView('wallet')}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            backgroundColor: currentView === 'wallet' ? '#007bff' : '#ffffff',
            color: currentView === 'wallet' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Wallet
        </button>
        <button
          onClick={() => setCurrentView('browser')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentView === 'browser' ? '#007bff' : '#ffffff',
            color: currentView === 'browser' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          DApp Browser
        </button>
      </nav>

      {currentView === 'wallet' && <Wallet />}
      {currentView === 'browser' && <DAppBrowser />}
    </div>
  );
}

export default App;
