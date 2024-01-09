
import { useContext, useEffect, useState } from "react";
import "./Movies.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard/MovieCard";

const Movies = () => {
    const {lang} = useContext(globalContext);

    const [movies,setMovies] = useState([]);

    const {filter}= useParams()

    useEffect(()=>{
        fetchData(`movie/${filter}?language=${lang}&page=1`)
        .then((data)=> {
            setMovies(data);
            console.log(data);
        })
    },[lang,filter]);

  return (
    <main className="movies">
        <div className="movies-container">
            <section className="filters">
                <h4 className="filt-title">
                    {filter?.replace('_',' ')} Movies
                </h4>

            </section>
            <div className="movies-content">
                {
                    movies?.results?.map((movie)=> (
                        <MovieCard key={movie?.id} movie={movie} type='movie'/>
                    ))
                }

            </div>
        </div>
    </main>
  )
}

export default Movies