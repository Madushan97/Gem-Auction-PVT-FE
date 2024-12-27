import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import ViewAuction from './pages/ViewAuction';


const App = () => {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/getAllAuctions' element={<ViewAuction />} />
      </Routes>
    </Router>
  );

};

export default App;
