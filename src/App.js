
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { globalContext } from './GlobalStateContext/GlobalContext';

import Header from './Components/header/Header.jsx';
import TrailerPlayer from './Components/sharedComponents/trailerPlayer/TrailerPlayer.jsx';
import Home from './Pages/home/Home.jsx';
import FilteredMediaList from './Pages/filteredMediaList/FilteredMediaList.jsx';
import PopularPresons from './Pages/person/popularPersons/PopularPresons.jsx';
import MovieLayout from './Layouts/movieLayout/MovieLayout.jsx';
import Main from './Pages/movie/Main.jsx';
import Reviews from './Pages/sharedPages/reviews/Reviews.jsx';
import Cast from './Pages/sharedPages/cast&Crew/Cast.jsx';
import AlternativeTitles from './Pages/sharedPages/alternitaveTitles/AlternativeTitles.jsx';
import ReleaseDates from './Pages/sharedPages/releaseDates/ReleaseDates.jsx';
import Translations from './Pages/sharedPages/translations/Translations.jsx';
import Changes from './Pages/sharedPages/changes/Changes.jsx';

import TvShowsLayout from './Layouts/tvShowsLayout/TvShowsLayout.jsx';
import Tv from './Pages/tv/main/Tv.jsx';
import TvShowSeasons from './Pages/tv/TvShowSeasons/TvShowSeasons.jsx';
import SeasonEpisodes from './Pages/tv/SeasonEpisodes/SeasonEpisodes.jsx';
import Person from './Pages/person/main/Person.jsx';
import Keywords from './Pages/keywords/Keywords.jsx';
import Search from './Pages/search/Search.jsx';
import Footer from './Components/footer/Footer.jsx';
import MainLoaing from './Components/mainLoding/MainLoaing.jsx';


function App() {

  const {isTrailer} = useContext(globalContext);
  const [isLoaderModel,setIsLoaderModel] = useState(true);

  useEffect(()=> {

    const timeOut = setTimeout(()=>{
      setIsLoaderModel(false)
    },1200); 

    return ()=> clearTimeout(timeOut)
  },[setIsLoaderModel]);

  return (
    <BrowserRouter>
      <Header />
      {
        isLoaderModel && <MainLoaing />
      }
      {
        isTrailer &&     <TrailerPlayer />
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
