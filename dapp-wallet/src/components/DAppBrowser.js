// src/components/DAppBrowser.js
import React, { useState, useRef } from 'react';
import Web3Provider from '../services/Web3Provider';

const DAppBrowser = () => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('https://uniswap.org');
  const iframeRef = useRef();
  const web3Provider = new Web3Provider();

  const handleNavigate = () => {
    setCurrentUrl(url);
  };

  const injectWeb3Provider = () => {
    const provider = web3Provider.createWeb3Provider();
    
    const injectedScript = `
      (function() {
        if (typeof window.ethereum !== 'undefined') {
          console.log('Web3 provider already exists');
          return;
        }
        
        window.ethereum = {
          isMetaMask: ${provider.isMetaMask},
          chainId: "${provider.chainId}",
          request: function(args) {
            return new Promise((resolve, reject) => {
              window.parent.postMessage({
                type: 'WEB3_REQUEST',
                method: args.method,
                params: args.params || []
              }, '*');
              
              // Simple response handling
              setTimeout(() => {
                if (args.method === 'eth_requestAccounts') {
                  resolve(['0x742d35Cc6B9e0F0FE1C4A0F8746c5e8e8B0Ff']);
                } else {
                  resolve('0x' + Date.now().toString(16));
                }
              }, 1000);
            });
          },
          on: function(event, callback) {
            console.log('Event listener added:', event);
          }
        };
        
        window.dispatchEvent(new Event('ethereum#initialized'));
        console.log('Web3 provider injected successfully');
      })();
    `;

    if (iframeRef.current) {
      try {
        const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
        const script = iframeDocument.createElement('script');
        script.textContent = injectedScript;
        iframeDocument.head.appendChild(script);
      } catch (error) {
        console.error('Could not inject Web3 provider:', error);
      }
    }
  };

  const handleIframeLoad = () => {
    // Wait a bit for the page to load completely
    setTimeout(injectWeb3Provider, 2000);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter DApp URL (e.g., https://uniswap.org)"
          style={{ width: '70%', padding: '8px', marginRight: '10px' }}
        />
        <button onClick={handleNavigate} style={{ padding: '8px 15px' }}>
          Navigate
        </button>
      </div>
      
      <iframe
        ref={iframeRef}
        src={currentUrl}
        title="DApp Browser"
        style={{ flex: 1, border: 'none' }}
        onLoad={handleIframeLoad}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
};

export default DAppBrowser;
