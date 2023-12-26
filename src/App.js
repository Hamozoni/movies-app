
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Movie from './Pages/Movie/Movie';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='/movie/:id'  element={<Movie />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
