import {useParams } from "react-router-dom"

import "./Main.scss";
import { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utilities/fetchData";
import MovieTvCover from "../../../Components/movieComponents/MovieTvCover/MovieTvCover";
import TopBilledCast from "../../../Components/TopBilledCast/TopBilledCast";
import MovieSocial from "../../../Components/movieComponents/MovieSocial/MovieSocial";
import MovieMedia from "../../../Components/movieComponents/MovieMedia/MovieMedia";
import Recommendations from "../../../Components/Recommendations/Recommendations";
import MovieStitistics from "../../../Components/movieComponents/MovieStitistics/MovieStitistics";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";



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
                        <MovieMedia id={id} mediaType='movie' />
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