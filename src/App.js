
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Movie from './Pages/Movie/Movie';
import Person from './Pages/Person/Person';
import Tv from './Pages/Tv/Tv';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='/movie/:id'  element={<Movie />}/>
            <Route path='/tv/:id'  element={<Tv />}/>
            <Route path='/person/:id'  element={<Person />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
