import { useParams } from "react-router-dom"

import "./Move.scss";
import { useContext, useEffect, useState } from "react";
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

    },[id]);

    return (
        <main className="movie">
            <div className="movie-container">
                <MovieTvCover details={movieDetails} />
            </div>
        </main>
    )
};

export default Movie;