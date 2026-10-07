import { useState } from 'react';
import './App.css';
import cardLogo from './assets/card-logo.svg';

function App() {
  // 1. LA MEMORIA
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });

  // 2. LE REGOLE (Cosa succede quando scrivi)
  const handleNameChange = (e) => {
    setFormData({ ...formData, cardholderName: e.target.value.toUpperCase() });
  };

  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    if (value.length <= 19) setFormData({ ...formData, cardNumber: value });
  };

  const handleMonthChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) setFormData({ ...formData, expMonth: value });
  };

  const handleYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 2) setFormData({ ...formData, expYear: value });
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) setFormData({ ...formData, cvc: value });
  };

  // 3. I TESTI DA MOSTRARE SULLE CARTE
  const displayNum = formData.cardNumber || '0000 0000 0000 0000';
  const displayName = formData.cardholderName || 'JANE APPLESEED';
  const displayMonth = formData.expMonth || '00';
  const displayYear = formData.expYear || '00';
  const displayCvc = formData.cvc || '000';

  // 4. IL DESIGN (Tutto insieme)
  return (
    <main className="app-layout">
      
      {/* --- SINISTRA: LE CARTE --- */}
      <section className="bg-section">
        <div className="card-front">
          <img src={cardLogo} alt="Card Logo" className="card-logo" />
          <div className="card-info">
            <h2 className="card-number">{displayNum}</h2>
            <div className="card-details">
              <span className="card-name">{displayName}</span>
              <span className="card-exp">{displayMonth}/{displayYear}</span>
            </div>
          </div>
        </div>

        <div className="card-back">
          <span className="cvc-number">{displayCvc}</span>
        </div>
      </section>

      {/* --- DESTRA: IL FORM --- */}
      <section className="form-section">
        <form className="card-form" onSubmit={(e) => e.preventDefault()}>
          
          <div className="input-group">
            <label htmlFor="cardholderName">CARDHOLDER NAME</label>
            <input 
              type="text" 
              placeholder="e.g. Jane Appleseed" 
              value={formData.cardholderName}
              onChange={handleNameChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input 
              type="text" 
              placeholder="e.g. 1234 5678 9123 0000" 
              value={formData.cardNumber}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-row">
            <div className="input-group exp-group">
              <label>EXP. DATE (MM/YY)</label>
              <div className="exp-inputs">
                <input 
                  type="text" 
                  placeholder="MM" 
                  value={formData.expMonth}
                  onChange={handleMonthChange}
                />
                <input 
                  type="text" 
                  placeholder="YY" 
                  value={formData.expYear}
                  onChange={handleYearChange}
                />
              </div>
            </div>

            <div className="input-group cvc-group">
              <label htmlFor="cvc">CVC</label>
              <input 
                type="text" 
                placeholder="e.g. 123" 
                value={formData.cvc}
                onChange={handleCvcChange}
              />
            </div>
          </div>

          <button type="submit" className="btn-confirm">Confirm</button>
        </form>
      </section>

    </main>
  );
}

export default App;