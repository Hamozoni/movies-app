import { useParams } from "react-router-dom"

import "./Move.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieTvCover from "../../Components/MovieTvCover/MovieTvCover";

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
            </Suspense>
            </div>
        </main>
    )
};

export default Movie;