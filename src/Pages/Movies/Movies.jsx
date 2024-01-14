
import { createContext, useContext, useEffect, useState } from "react";
import "./Movies.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard/MovieCard";
import MovieTvFilter from "../../Components/MovieTvFilter/MovieTvFilter";
import PageNumber from "../../Components/PageNumber/PageNumber";

export const movieFilter = createContext();


const Movies = () => {

    const intialFilter = {
        sort_by: [],
        'release_date.gte': [],
        'release_date.lte': [],
        without_genres: [],
        with_original_language: ['none seleted'],
        with_watch_providers: [],
        'vote_average.gte': 0,
        'vote_average.lte' : 10,
        'with_runtime.gte': 0,
        'with_runtime.lte': 400
    }

    const {lang} = useContext(globalContext);

    const [movies,setMovies] = useState([]);
    const [moviesFilter,setMoviesFilter] = useState(intialFilter);
    const [page,setPage] = useState(1);

    const {filter}= useParams()

    useEffect(()=>{
        fetchData(`movie/${filter}?language=${lang}&page=${page}`)
        .then((data)=> {
            setMovies(data);
            console.log(data);
        })   
    },[lang,filter,page]);

    useEffect(()=>{
         console.log(moviesFilter)
    },[moviesFilter])

    const discoverMovies = (filter)=> {
        fetchData(`discover/movie?include_adult=false`)
        .then((data)=> {
            setMovies(data);
            console.log(data);
        })
    }

  return (
    <movieFilter.Provider value={[moviesFilter,setMoviesFilter]}>
        <main className="movies">
            <div className="movies-container">
                <MovieTvFilter />

                <div className="movies-box">
                    <div className="movies-content">
                        {
                            movies?.results?.map((movie)=> (
                                <MovieCard key={movie?.id} movie={movie} type='movie'/>
                            ))
                        }

                    </div>
                    <PageNumber page={page} setPage={setPage} totalPages={movies?.total_pages}/>
                </div>

            </div>
        </main>
    </movieFilter.Provider>
  )
}

export default Movies