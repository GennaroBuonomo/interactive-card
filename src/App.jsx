import './App.css';
import cardLogo from './assets/card-logo.svg';

function App() {
  return (
    <main className="app-layout">
      
      {/* SEZIONE SINISTRA: Sfondo con immagine desktop/mobile */}
      <section className="bg-section">
        
        {/* Carta Frontale */}
        <div className="card-front">
          <img src={cardLogo} alt="Card Logo" className="card-logo" />
          <div className="card-info">
            <h2 className="card-number">0000 0000 0000 0000</h2>
            <div className="card-details">
              <span className="card-name">JANE APPLESEED</span>
              <span className="card-exp">00/00</span>
            </div>
          </div>
        </div>

        {/* Carta Posteriore */}
        <div className="card-back">
          <span className="cvc-number">000</span>
        </div>

      </section>

      {/* SEZIONE DESTRA: Form di input */}
      <section className="form-section">
        <form className="card-form" onSubmit={(e) => e.preventDefault()}>
          
          <div className="input-group">
            <label htmlFor="cardholderName">CARDHOLDER NAME</label>
            <input type="text" id="cardholderName" placeholder="e.g. Jane Appleseed" />
          </div>

          <div className="input-group">
            <label htmlFor="cardNumber">CARD NUMBER</label>
            <input type="text" id="cardNumber" placeholder="e.g. 1234 5678 9123 0000" />
          </div>

          <div className="form-row">
            <div className="input-group exp-group">
              <label>EXP. DATE (MM/YY)</label>
              <div className="exp-inputs">
                <input type="text" placeholder="MM" />
                <input type="text" placeholder="YY" />
              </div>
            </div>

            <div className="input-group cvc-group">
              <label htmlFor="cvc">CVC</label>
              <input type="text" id="cvc" placeholder="e.g. 123" />
            </div>
          </div>

          <button type="submit" className="btn-confirm">Confirm</button>
        </form>
      </section>

    </main>
  );
}

export default App;