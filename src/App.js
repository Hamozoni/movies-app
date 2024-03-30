
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { globalContext } from './GlobalStateContext/GlobalContext';

import Header from './Components/headerComponents/header/Header.jsx';
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
import Backdrops_posters from './Pages/sharedPages/backdrops&posters/Backdrops&posters.jsx';
import MediaVideos from './Pages/sharedPages/mediaVideos/MediaVideos.jsx';
import TvShowSeasonLayout from './Layouts/tvShowSeason/TvShowSeason.jsx';
import EpisodesLayout from './Layouts/tvShowsEpisodeLayout.jsx/EpisodesLayout.jsx';
import CollectionLayout from './Layouts/collectionLayout/CollectionLayout.jsx';
import Collection from './Pages/collection/Collection.jsx';
import PersonLayout from './Layouts/personLayout/PersonLayout.jsx';


function App() {

  const {trailer,theme} = useContext(globalContext);
  const [isLoaderModel,setIsLoaderModel] = useState(true);

  useEffect(()=> {

    const timeOut = setTimeout(()=>{
      setIsLoaderModel(false)
    },1200); 

    return ()=> clearTimeout(timeOut)
  },[setIsLoaderModel]);

  return (
    <main className={`myh-app back-color-${theme}`}>
      <BrowserRouter>
        <Header />
        {
          isLoaderModel && <MainLoaing />
        }
        {
          trailer.isTrailer &&     <TrailerPlayer />
        }
          <Routes>
              <Route path='/'  element={<Home />}/>
              <Route path='list/movie/:filter'  element={<FilteredMediaList mediaType='movie' />}/>
              <Route path='list/tv/:filter'  element={<FilteredMediaList mediaType='tv'  />}/>
              <Route path='list/person/:filter'  element={<PopularPresons />}/>
              <Route  /> 
              <Route path='/movie/:id' element={<MovieLayout />}>
                  <Route index  element={<Main />}/>
                  <Route path='reviews'  element={<Reviews />}/>
                  <Route path='castCrew'  element={<Cast />}/>
                  <Route path='titles'  element={<AlternativeTitles mediaType='movie' />}/>
                  <Route path='releaseDates'  element={<ReleaseDates  />}/>
                  <Route path='translations'  element={<Translations  />}/>
                  <Route path='changes'  element={<Changes />}/>
                  <Route path='backdrops'  element={<Backdrops_posters type='backdrops'/>}/>
                  <Route path='posters'  element={<Backdrops_posters  type='posters'/>}/>
                  <Route path='logos'  element={<Backdrops_posters type='logos'/>}/>
                  <Route path='videos'  element={<MediaVideos />}/>
              </Route>
              

              <Route path='/tv/:id'  element={<TvShowsLayout />}>
                  <Route index element={<Tv/>}/>
                  <Route path='seasons'  element={<TvShowSeasons />}/>
                  <Route path='reviews'  element={<Reviews />}/>
                  <Route path='castCrew'  element={<Cast />}/>
                  <Route path='titles'  element={<AlternativeTitles mediaType='tv' />}/>
                  <Route path='translations'  element={<Translations />}/>
                  <Route path='changes'  element={<Changes />}/>
                  <Route path='backdrops'  element={<Backdrops_posters  type='backdrops'/>}/>
                  <Route path='posters'  element={<Backdrops_posters  type='posters'/>}/>
                  <Route path='logos'  element={<Backdrops_posters type='logos'/>}/>
                  <Route path='videos'  element={<MediaVideos />}/>
              </Route>

              <Route path='/tv/:id/season/:seasonNumber' element={<TvShowSeasonLayout/>} >
                <Route index element={<SeasonEpisodes />}/>
                <Route path='castCrew'  element={<Cast />}/>
                <Route path='translations'  element={<Translations />}/>
                <Route path='posters'  element={<Backdrops_posters  type='posters'/>} />
                <Route path='videos'  element={<MediaVideos  />}/>
              </Route>

              <Route path='/tv/:id/season/:seasonNumber/episode/:episodeNumber'element={<EpisodesLayout />}  >
                  <Route path='stills'  element={<Backdrops_posters type='stills' />}  />
                  <Route path='videos'  element={<MediaVideos  />}/>
                  <Route path='castCrew'  element={<Cast />}/>
                  <Route path='translations'  element={<Translations />}/>
              </Route>
              <Route path='/collection/:id'  element={<CollectionLayout />}> 
                  <Route index element={<Collection />}/>
                  <Route path='translations'  element={<Translations />}/>
                  <Route path='posters'  element={<Backdrops_posters type='poster'/>}  />
                  <Route path='backdrops'  element={<Backdrops_posters type='backdrops'/>}/>
              </Route>

              <Route path='/person/:id'  element={<PersonLayout />}>
                  <Route index  element={<Person />}/>
                  <Route path='translations'  element={<Translations />}/>
                  <Route path='profiles'  element={<Backdrops_posters type='profiles'/>}/>
              </Route>
              <Route path='/keywords/:id'  element={<Keywords />}/>
              <Route path='/search/:type'  element={<Search />}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
