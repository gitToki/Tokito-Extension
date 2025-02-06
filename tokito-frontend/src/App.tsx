import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import { getTokens, Token } from './api';  // Importer l'interface Token

const App = () => {
  const [hasWallet, setHasWallet] = useState(false);
  const [privateKey, setPrivateKey] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);  // Typage du tableau tokens

  // Vérifier si un wallet existe en localStorage
  useEffect(() => {
    const savedWallet = localStorage.getItem('walletAddress');
    if (savedWallet) {
      setHasWallet(true);
      setWalletAddress(savedWallet);
      // Récupérer les tokens associés à l'adresse en appelant l'API backend
      fetchTokens(savedWallet);
    }
  }, []);

  // Fonction pour récupérer les tokens associés à une adresse
  const fetchTokens = async (address: string) => {
    try {
      const tokensList = await getTokens(address);  // Appeler l'API backend pour récupérer les tokens
      setTokens(tokensList);  // Mettre à jour l'état avec la liste des tokens récupérés
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  };

  // Générer un nouveau wallet
  const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    localStorage.setItem('walletAddress', wallet.address);
    localStorage.setItem('privateKey', wallet.privateKey);  // Clé privée stockée localement uniquement
    setHasWallet(true);
    setWalletAddress(wallet.address);
    setTokens([]);  // Réinitialiser la liste des tokens

    // Récupérer les tokens associés au nouveau wallet
    fetchTokens(wallet.address);
  };

  // Connexion avec une clé privée
  const connectWithPrivateKey = () => {
    if (privateKey) {
      try {
        const wallet = new ethers.Wallet(privateKey);
        localStorage.setItem('walletAddress', wallet.address);
        localStorage.setItem('privateKey', privateKey);  // Clé privée stockée localement uniquement
        setHasWallet(true);
        setWalletAddress(wallet.address);
        setTokens([]);  // Réinitialiser la liste des tokens

        // Récupérer les tokens associés à l'adresse
        fetchTokens(wallet.address);
      } catch (error) {
        alert('Invalid Private Key');
      }
    } else {
      alert('Please enter a private key');
    }
  };

  return (
    <div className="App">
      {!hasWallet ? (
        <div className="wallet-setup">
          <p>Choose an option :</p>

          <button onClick={generateNewWallet} className="button">
            Generate New Wallet
          </button>

          <div className="or">or</div>

          <div>
            <input
              type="text"
              placeholder="Enter Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="private-key-input"
            />
            <button onClick={connectWithPrivateKey} className="button">
              Connect with Private Key
            </button>
          </div>
        </div>
      ) : (
        <div className="wallet-info">
          <h1>Wallet Found</h1>
          <p>Address: {walletAddress}</p>
          <h2>Tokens:</h2>
          {tokens.length > 0 ? (
            <ul>
              {tokens.map((token, index) => (
                <li key={index}>
                  {token.symbol} - Balance: {token.balance}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tokens found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
