import React, { useContext} from 'react'
import { Link, useParams} from 'react-router-dom'
import MovieTvCover from '../../../Components/movieComponents/movieTvCover/MovieTvCover';
import TopBilledCast from '../../../Components/sharedComponents/topBilledCast/TopBilledCast';
import MovieSocial from '../../../Components/sharedComponents/movieSocial/MovieSocial';
import TvSeasonCard from '../../../Components/tvComponents/tvSeasonCard/TvSeasonCard';

import Media from "../../../Components/sharedComponents/mediaImages/Media";

import "./Tv.scss";
import MovieStitistics from '../../../Components/movieComponents/movieStitistics/MovieStitistics';

import Recommendations from "../../../Components/sharedComponents/recommendations/Recommendations";
import { tvShowDetailsContext } from '../../../Layouts/TvShowsLayout';
import { languages } from '../../../utilities/languages';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const Tv = () => {

const{details} = useContext(tvShowDetailsContext);
const {lang,theme} = useContext(globalContext);
const {id} = useParams()


  return (
   
        <div className="tv-container">
            <MovieTvCover details={details} mediaType='tv' />
            <section className='tv-content'>
                 <section className='cast'>
                    <TopBilledCast mediaType='tv' id={id} title='Series Cast'/>
                    <section className='tv-season b-b'>
                        <h4 className={`t-color-${theme} sea-name`}>
                               {languages[lang].currentSeason}
                        </h4>
                            <TvSeasonCard  tvShow={details?.seasons[details?.seasons?.length - 1]} id={id}/>
                        <Link 
                            className='to-seasons link-color' 
                            to={`/tv/${id}/seasons`}
                            >
                            {languages[lang].viewAll} {languages[lang].seasons}
                        </Link>
                    </section>
                    <MovieSocial section='reviews' mediaType='tv'/>
                    <Media id={id} mediaType='tv' />
                    <Recommendations id={id} mediaType='tv'/>
                 </section>
                 <div className="right-content">
                    <MovieStitistics id={id} details={details} type='tv' />
                </div>
            </section>

        </div>
    
  )
}

export default Tv