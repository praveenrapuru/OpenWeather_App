import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherDetails from './Components/WeatherDetails';
import Home from './Components/Home';

function App() {
  return (
    <div className='container-xl'>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:date" element={<WeatherDetails />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
