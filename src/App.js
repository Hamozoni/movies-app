
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
import Search from './Pages/Search/Search';
import Movies from './Pages/Movies/Movies';
import Reviews from './Pages/Reviews/Reviews';
import Cast from './Pages/Cast/Cast';
import AlternativeTitles from './Pages/AlternitaveTitles/AlternativeTitles';
import ReleaseDates from './Pages/ReleaseDates/ReleaseDates';
import Translations from './Pages/Translations/Translations';
import Changes from './Pages/Changes/Changes';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='/movies/:filter'  element={<Movies />}/>
            <Route path='/movie'  element={<Movie />}/>
            <Route path='/movie/reviews'  element={<Reviews />}/>
            <Route path='/movie/cast'  element={<Cast />}/>
            <Route path='/movie/titles'  element={<AlternativeTitles />}/>
            <Route path='/movie/releases'  element={<ReleaseDates />}/>
            <Route path='/movie/translations'  element={<Translations/>}/>
            <Route path='/movie/changes'  element={<Changes/>}/>
            <Route path='/tv'  element={<Tv />}/>
            <Route path='/tv/seasons'  element={<TvShowSeasons />}/>
            <Route path='/tv/season/:seasonNumber'  element={<SeasonEpisodes />}/>
            <Route path='/person'  element={<Person />}/>
            <Route path='/keywords/:id'  element={<Keywords />}/>
            <Route path='/search/:type'  element={<Search />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
