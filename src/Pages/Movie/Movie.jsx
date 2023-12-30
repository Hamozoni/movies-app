import { useParams } from "react-router-dom"

import "./Movie.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieTvCover from "../../Components/MovieTvCover/MovieTvCover";
import TopBilledCast from "../../Components/TopBilledCast/TopBilledCast";
import MovieSocial from "../../Components/MovieSocial/MovieSocial";
import MovieMedia from "../../Components/MovieMedia/MovieMedia";
import MovieStitistics from "../../Components/MovieStitistics/MovieStitistics";

const Movie = ()=> {
    const {id} = useParams();
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
        <main className="movie">
            <div className="movie-container">
            <Suspense fallback={<p>loading... </p>} >
                <MovieTvCover details={movieDetails} />
                <section className="movie-content">
                    <div className="left-content">
                        <TopBilledCast id={id}/>
                        <MovieSocial id={id} section='reviews' />
                        <MovieMedia id={id} />

                    </div>
                    <div className="right-content">
                        <MovieStitistics id={id} details={movieDetails} />
                    </div>

                </section>
            </Suspense>
            </div>
        </main>
    )
};

export default Movie;