
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
import Reviews from './Pages/Reviews/Reviews';
import Cast from './Pages/Cast/Cast';
import AlternativeTitles from './Pages/AlternitaveTitles/AlternativeTitles';
import ReleaseDates from './Pages/ReleaseDates/ReleaseDates';
import Translations from './Pages/Translations/Translations';
import Changes from './Pages/Changes/Changes';
import FilteredMediaList from './Pages/FilteredMediaList/FilteredMediaList';
import PopularPresons from './Pages/PopularPersons/PopularPresons';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='list/movie/:filter'  element={<FilteredMediaList mediaType='movie' />}/>
            <Route path='list/tv/:filter'  element={<FilteredMediaList mediaType='tv'  />}/>
            <Route path='list/person/:filter'  element={<PopularPresons />}/>
            <Route path='/movie/:id'  element={<Movie />}/>
            <Route path='/movie/:id/reviews'  element={<Reviews />}/>
            <Route path='/movie/:id/cast'  element={<Cast />}/>
            <Route path='/movie/:id/titles'  element={<AlternativeTitles />}/>
            <Route path='/movie/:id/releases'  element={<ReleaseDates />}/>
            <Route path='/movie/:id/translations'  element={<Translations/>}/>
            <Route path='/movie/:id/changes'  element={<Changes/>}/>
            <Route path='/tv/:id'  element={<Tv />}/>
            <Route path='/tv/:id/seasons'  element={<TvShowSeasons />}/>
            <Route path='/tv/:id/season/:seasonNumber'  element={<SeasonEpisodes />}/>
            <Route path='/person/:id'  element={<Person />}/>
            <Route path='/keywords/:id'  element={<Keywords />}/>
            <Route path='/search/:type'  element={<Search />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
