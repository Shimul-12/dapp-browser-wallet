// src/utils/WalletKeyManager.js
import CryptoJS from 'crypto-js';

class WalletKeyManager {
  generateWallet() {
    // Generate random 32 bytes for private key
    const privateKey = CryptoJS.lib.WordArray.random(32).toString();
    return { privateKey };
  }

  encryptPrivateKey(privateKey, password) {
    return CryptoJS.AES.encrypt(privateKey, password).toString();
  }

  decryptPrivateKey(encryptedKey, password) {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

export default WalletKeyManager;
