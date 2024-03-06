import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchData from '../../Utilities/fetchData';
import { globalContext } from '../../GlobalStateContext/GlobalContext';
import MovieTvCover from '../../Components/movieComponents/movieTvCover/MovieTvCover';
import TopBilledCast from '../../Components/topBilledCast/TopBilledCast';
import MovieSocial from '../../Components/movieComponents/movieSocial/MovieSocial';
import MovieMedia from '../../Components/movieComponents/movieMedia/MovieMedia';
import Recommendations from '../../Components/Recommendations/Recommendations';
import TvSeasonCard from '../../Components/TvSeasonCard/TvSeasonCard';

import "./Tv.scss";
import MovieStitistics from '../../Components/movieComponents/movieStitistics/MovieStitistics';

const Tv = () => {
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState({});

    useEffect(()=>{
        fetchData(`tv/${id}?language=${lang}`)
        .then(data => {
            setDetails(data);
            console.log(data)
        })
        window.scrollTo({top: 0,left: 0 ,behavior: "smooth"})
    },[id,lang])

  return (
   
        <div className="tv-container">
            <MovieTvCover details={details}/>
            <section className='tv-content'>
                 <section className='cast'>
                    <TopBilledCast type='tv' id={id} title='Series Cast'/>
                    <section className='tv-season'>
                        <h4 className="sea-name">
                               Current Season
                        </h4>
                            {
                                details?.seasons?.length &&
                            <TvSeasonCard  tvShow={details?.seasons[details?.seasons?.length - 1]} id={id}/>
                            }
                        <Link className='to-seasons' to={`/tv/${id}/seasons`}>
                            view all seasons
                        </Link>
                    </section>
                    <MovieSocial id={id} section='reviews' mediaType='tv'/>
                    <MovieMedia id={id} mediaType='tv' />
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