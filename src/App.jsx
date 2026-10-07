import { useState } from 'react';
import './App.css';
import cardLogo from './assets/card-logo.svg';
import iconComplete from './assets/icon-complete.svg'; // L'icona del Thank You

function App() {
  // 1. STATO DEI DATI
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  });

  // 2. STATO DEGLI ERRORI E DEL COMPLETAMENTO
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  // 3. FUNZIONI DI GESTIONE INPUT
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

  // 4. FUNZIONE DI VALIDAZIONE (Scatta al click su Confirm)
  const validateForm = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Controllo Nome
    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Can't be blank";

    // Controllo Numero (deve essere lungo 19 caratteri: 16 numeri + 3 spazi)
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Can't be blank";
    } else if (formData.cardNumber.length < 19) {
      newErrors.cardNumber = "Wrong format, must be 16 digits";
    }

    // Controllo Data (Mese e Anno non vuoti)
    if (!formData.expMonth || !formData.expYear) {
      newErrors.expDate = "Can't be blank";
    } else if (parseInt(formData.expMonth) > 12 || parseInt(formData.expMonth) === 0) {
      newErrors.expDate = "Invalid month";
    }

    // Controllo CVC
    if (!formData.cvc) {
      newErrors.cvc = "Can't be blank";
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = "Must be 3 digits";
    }

    setErrors(newErrors);

    // Se l'oggetto degli errori è vuoto, significa che è andato tutto bene!
    if (Object.keys(newErrors).length === 0) {
      setIsCompleted(true);
    }
  };

  // 5. FUNZIONE PER RESETTARE IL FORM
  const resetForm = () => {
    setFormData({ cardholderName: '', cardNumber: '', expMonth: '', expYear: '', cvc: '' });
    setErrors({});
    setIsCompleted(false);
  };

  // VARIABILI PER IL DISPLAY (Carte)
  const displayNum = formData.cardNumber || '0000 0000 0000 0000';
  const displayName = formData.cardholderName || 'JANE APPLESEED';
  const displayMonth = formData.expMonth || '00';
  const displayYear = formData.expYear || '00';
  const displayCvc = formData.cvc || '000';

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

      {/* --- DESTRA: IL FORM O LA SCHERMATA DI SUCCESSO --- */}
      <section className="form-section">
        
        {!isCompleted ? (
          
          <form className="card-form" onSubmit={validateForm}>
            
            <div className="input-group">
              <label htmlFor="cardholderName">CARDHOLDER NAME</label>
              <input 
                type="text" 
                placeholder="e.g. Jane Appleseed" 
                value={formData.cardholderName}
                onChange={handleNameChange}
                className={errors.cardholderName ? 'input-error' : ''}
              />
              {errors.cardholderName && <span className="error-msg">{errors.cardholderName}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="cardNumber">CARD NUMBER</label>
              <input 
                type="text" 
                placeholder="e.g. 1234 5678 9123 0000" 
                value={formData.cardNumber}
                onChange={handleNumberChange}
                className={errors.cardNumber ? 'input-error' : ''}
              />
              {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
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
                    className={errors.expDate ? 'input-error' : ''}
                  />
                  <input 
                    type="text" 
                    placeholder="YY" 
                    value={formData.expYear}
                    onChange={handleYearChange}
                    className={errors.expDate ? 'input-error' : ''}
                  />
                </div>
                {errors.expDate && <span className="error-msg">{errors.expDate}</span>}
              </div>

              <div className="input-group cvc-group">
                <label htmlFor="cvc">CVC</label>
                <input 
                  type="text" 
                  placeholder="e.g. 123" 
                  value={formData.cvc}
                  onChange={handleCvcChange}
                  className={errors.cvc ? 'input-error' : ''}
                />
                {errors.cvc && <span className="error-msg">{errors.cvc}</span>}
              </div>
            </div>

            <button type="submit" className="btn-confirm">Confirm</button>
          </form>

        ) : (

          <div className="success-message">
            <img src={iconComplete} alt="Complete Icon" className="success-icon" />
            <h2>THANK YOU!</h2>
            <p>We've added your card details</p>
            <button className="btn-confirm" onClick={resetForm}>Continue</button>
          </div>

        )}

      </section>
    </main>
  );
}

export default App;