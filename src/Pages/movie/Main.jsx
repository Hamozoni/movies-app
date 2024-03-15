import {useParams } from "react-router-dom"

import "./Main.scss";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieTvCover from "../../Components/movieComponents/movieTvCover/MovieTvCover";
import MovieSocial from "../../Components/sharedComponents/movieSocial/MovieSocial";
import Media from "../../Components/sharedComponents/mediaImages/Media";
import Recommendations from "../../Components/sharedComponents/recommendations/Recommendations";
import MovieStitistics from "../../Components/movieComponents/movieStitistics/MovieStitistics";
import TopBilledCast from "../../Components/sharedComponents/topBilledCast/TopBilledCast";
import Error from "../../Components/error/Error";
import Loading from "../../Components/loading/Loading";



const Main = ()=> {
    const  {id} = useParams();
 
    const {lang} = useContext(globalContext);
    
    const [movieDetails,setMovieDetails] = useState(null)
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetch = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`movie/${id}?language=${lang}`)
        .then((data)=>{
            setMovieDetails(data);
            setIsPending(false);
            setError(null);
        })
        .catch((error)=>{
            setError(error);
            setIsPending(false)
        });
    }

    useEffect(fetch,[id]);

    return (
            <div className="movie-container">
                {
                    isPending ? <Loading width='100%' height='calc(100vh - 100px)' /> : 
                    movieDetails ? 
                      <MovieTvCover details={movieDetails} mediaType='movie'/>
                    : error && <Error error={error} height='calc(100vh - 100px)'  onClick={fetch} />
                }
                <section className="movie-content">
                    <div className="left-content">
                        <TopBilledCast mediaType='movie' id={id} title='Series Top Billed Cast'/>
                        <MovieSocial section='reviews' mediaType='movie'/>
                        <Media id={id} mediaType='movie' />
                        <Recommendations id={id} mediaType='movie'/>
                    </div>
                    <div className="right-content">
                        {
                            isPending ? <Loading width='100%' height='100vh' /> : 
                            movieDetails?.length ? 
                            <MovieStitistics id={id} details={movieDetails}  type='movie' />
                            : error && <Error error={error} height='100vh' onClick={fetch} />
                        }
                    </div>

                </section>
            </div>
    )
};

export default Main;