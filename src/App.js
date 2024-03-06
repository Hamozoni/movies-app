
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Person from './Pages/Person/Person';
import Tv from './Pages/Tv/Tv';
import Keywords from './Pages/Keywords/Keywords';
import TvShowSeasons from './Pages/TvShowSeasons/TvShowSeasons';
import SeasonEpisodes from './Pages/SeasonEpisodes/SeasonEpisodes';
import Search from './Pages/Search/Search';
import Reviews from './Pages/Movie/Reviews/Reviews';
import Cast from './Pages/Movie/Cast/Cast';
import AlternativeTitles from './Pages/Movie/AlternitaveTitles/AlternativeTitles';
import ReleaseDates from './Pages/Movie/ReleaseDates/ReleaseDates';
import Translations from './Pages/Movie/Translations/Translations';
import Changes from './Pages/Movie/Changes/Changes';
import FilteredMediaList from './Pages/FilteredMediaList/FilteredMediaList';
import PopularPresons from './Pages/PopularPersons/PopularPresons';
import { useContext } from 'react';
import { globalContext } from './GlobalStateContext/GlobalContext';
import TrailerPlayer from './Components/TrailerPlayer/TrailerPlayer';
import MovieLayout from './Layouts/movieLayout/MovieLayout';
import Main from './Pages/Movie/main/Main';
import TvShowsLayout from './Layouts/tvShowsLayout/TvShowsLayout';

function App() {

  const {isTrailer} = useContext(globalContext);

  return (
    <BrowserRouter>
      <Header />
      {
        isTrailer && (<TrailerPlayer />)
      }
        <Routes>
            <Route path='/'  element={<Home />}/>
            <Route path='list/movie/:filter'  element={<FilteredMediaList mediaType='movie' />}/>
            <Route path='list/tv/:filter'  element={<FilteredMediaList mediaType='tv'  />}/>
            <Route path='list/person/:filter'  element={<PopularPresons />}/>
            <Route  /> 
            <Route path='/movie/:id' element={<MovieLayout />}>
                <Route index  element={<Main />}/>
                <Route path='reviews'  element={<Reviews  mediaType='movie'/>}/>
                <Route path='cast'  element={<Cast mediaType='movie'/>}/>
                <Route path='titles'  element={<AlternativeTitles mediaType='movie' />}/>
                <Route path='releases'  element={<ReleaseDates mediaType='movie' />}/>
                <Route path='translations'  element={<Translations mediaType='movie' />}/>
                <Route path='changes'  element={<Changes mediaType='movie'/>}/>
            </Route>
            

            <Route path='/tv/:id'  element={<TvShowsLayout />}>
                <Route index element={<Tv/>}/>
                <Route path='seasons'  element={<TvShowSeasons />}/>
                <Route path='season/:seasonNumber'  element={<SeasonEpisodes />}/>
                <Route path='reviews'  element={<Reviews mediaType='tv' />}/>
                <Route path='cast'  element={<Cast mediaType='tv'/>}/>
                <Route path='titles'  element={<AlternativeTitles  mediaType='tv'/>}/>
                <Route path='releases'  element={<ReleaseDates mediaType='tv'/>}/>
                <Route path='translations'  element={<Translations mediaType='tv'/>}/>
                <Route path='changes'  element={<Changes mediaType='tv'/>}/>
            </Route>
            <Route path='/person/:id'  element={<Person />}/>
            <Route path='/keywords/:id'  element={<Keywords />}/>
            <Route path='/search/:type'  element={<Search />}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
