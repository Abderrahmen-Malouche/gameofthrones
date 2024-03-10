import './App.css';
import Home from './Pages/Home/Home.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Houses from './Pages/Houses/Houses.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Books from './Pages/Books/Books.jsx';
import SingleBook from './Pages/Books/SingleBook.jsx';
import Characters from "./Pages/Characters/Characters.jsx"
import SingleCharacter from './Pages/Characters/SingleCharacter.jsx';
import SingleHouse from './Pages/Houses/SingleHouse.jsx';
function App() {
  return (
    <Router>
      <Navbar/>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/houses" element={<Houses/>} />
        <Route path="/houses/:id" element={<SingleHouse/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/books/:id" element={<SingleBook/>} />
        <Route path="/characters" element={<Characters/>} />
        <Route path="/characters/:id" element={<SingleCharacter/>} />
    </Routes>
  </Router>  );
}

export default App;
