
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Movie from './Pages/Movie/Movie';
import Person from './Pages/Person/Person';
import Tv from './Pages/Tv/Tv';
import Keywords from './Pages/Keywords/Keywords';
import TvShowSeasons from './Pages/TvShowSeasons/TvShowSeasons';
import SeasonEpisodes from './Pages/SeasonEpisodes/SeasonEpisodes';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='/movie/:id'  element={<Movie />}/>
            <Route path='/tv/:id'  element={<Tv />}/>
            <Route path='/tv/:id/seasons'  element={<TvShowSeasons />}/>
            <Route path='/tv/:id/season/:seasonNumber'  element={<SeasonEpisodes />}/>
            <Route path='/person/:id'  element={<Person />}/>
            <Route path='/keywords/:id'  element={<Keywords />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
