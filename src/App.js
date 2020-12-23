import logo from './assets/logos/Logo PokeHoum White.png';
import './App.css';
import Pokedex from './components/Pokedex'

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
      </header>
      <Pokedex/>
      <div className="footer">
        <p>Icons adapted and originally created by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> and <a href="https://www.flaticon.es/autores/becris" title="Becris">Becris</a>, from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      </div>
    </div>
  );
}

export default App;
