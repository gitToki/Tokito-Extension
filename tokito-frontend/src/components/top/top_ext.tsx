import './top.css';
import AppIcon from '../../../icons/AppIcon.png';

const Top = () => {
  return (
    <div className="top-container">
      <div className="top-content">
        <img src={AppIcon} alt="App Icon" className="top-logo" />
        <h1 className="top-title">Tokito Wallet</h1>
      </div>
    </div>
  );
};

export default Top;
