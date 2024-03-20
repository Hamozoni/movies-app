import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fetchData from '../../../utilities/fetchData';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import MovieTvCover from '../../../Components/movieComponents/movieTvCover/MovieTvCover';
import TopBilledCast from '../../../Components/sharedComponents/topBilledCast/TopBilledCast';
import MovieSocial from '../../../Components/sharedComponents/movieSocial/MovieSocial';
import TvSeasonCard from '../../../Components/tvComponents/tvSeasonCard/TvSeasonCard';

import Media from "../../../Components/sharedComponents/mediaImages/Media";

import "./Tv.scss";
import MovieStitistics from '../../../Components/movieComponents/movieStitistics/MovieStitistics';

import Recommendations from "../../../Components/sharedComponents/recommendations/Recommendations";
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';

const Tv = () => {
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDetails = () =>{
        setIsPending(true);
        setError(null);
        window.scrollTo({top: 0,left: 0 ,behavior: "smooth"});
        fetchData(`tv/${id}?language=${lang}`)
        .then(data => {
            setDetails(data);
            setIsPending(false);
            console.log(data);
            document.title = data?.name;
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        })
    }

    useEffect(fetchDetails,[id,lang])

  return (
   
    isPending ? <Loading width='100%'  height='calc(100vh - 100px)'/> : details ?
        <div className="tv-container">
            <MovieTvCover details={details} mediaType='tv' />

            <section className='tv-content'>
                 <section className='cast'>
                    <TopBilledCast mediaType='tv' id={id} title='Series Cast'/>
                    <section className='tv-season'>
                        <h4 className="sea-name">
                               Current Season
                        </h4>
                        {
                            isPending ? <Loading width='100%'  height='300px'/> : details ?
                            <TvSeasonCard  tvShow={details?.seasons[details?.seasons?.length - 1]} id={id}/>
                            : error && <Error error={error} height='300px' onClick={fetchDetails}/>
                        }
                        <Link className='to-seasons' to={`/tv/${id}/seasons`}>
                            view all seasons
                        </Link>
                    </section>
                    <MovieSocial section='reviews' mediaType='tv'/>
                    <Media id={id} mediaType='tv' />
                    <Recommendations id={id} mediaType='tv'/>
                 </section>
                 <div className="right-content">
                    {
                        isPending ? <Loading width='100%'  height='calc(100vh - 100px)'/> : details ?
                        <MovieStitistics id={id} details={details} type='tv' />
                        : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDetails}/>
                    }
                </div>
            </section>

        </div>
    : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDetails}/>
    
  )
}

export default Tv