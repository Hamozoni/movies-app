import { useParams } from "react-router-dom"

import "./Movie.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieTvCover from "../../Components/MovieTvCover/MovieTvCover";
import TopBilledCast from "../../Components/TopBilledCast/TopBilledCast";

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
                <TopBilledCast id={id}/>
            </Suspense>
            </div>
        </main>
    )
};

export default Movie;