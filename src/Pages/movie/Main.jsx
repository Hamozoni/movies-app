import {useParams } from "react-router-dom"

import "./Main.scss";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieTvCover from "../../Components/movieComponents/movieTvCover/MovieTvCover";
import MovieSocial from "../../Components/movieComponents/movieSocial/MovieSocial";
import Media from "../../Components/sharedComponents/mediaImages/Media";
import Recommendations from "../../Components/sharedComponents/recommendations/Recommendations";
import MovieStitistics from "../../Components/movieComponents/movieStitistics/MovieStitistics";
import TopBilledCast from "../../Components/sharedComponents/topBilledCast/TopBilledCast";



const Main = ()=> {
    const  {id} = useParams();
 
    const {lang} = useContext(globalContext);
    
    const [movieDetails,setMovieDetails] = useState({})

    useEffect(()=>{
        fetchData(`movie/${id}?language=${lang}`)
        .then((data)=>{
            setMovieDetails(data);
            console.log(data)
        })
        .catch((error)=>{
            console.log(error)
        })

    },[id]);

    return (
            <div className="movie-container">
                <MovieTvCover details={movieDetails} />
                <section className="movie-content">
                    <div className="left-content">
                        <TopBilledCast type='movie' id={id} title='Series Top Billed Cast'/>
                        <MovieSocial id={id} section='reviews' mediaType='movie'/>
                        <Media id={id} mediaType='movie' />
                        <Recommendations id={id} mediaType='movie'/>
                    </div>
                    <div className="right-content">
                        <MovieStitistics id={id} details={movieDetails}  type='movie' />
                    </div>

                </section>
            </div>
    )
};

export default Main;