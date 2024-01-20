
import { createContext, useContext, useEffect, useState } from "react";
import "./Movies.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard/MovieCard";
import MovieTvFilter from "../../Components/MovieTvFilter/MovieTvFilter";

export const movieFilter = createContext();


const Movies = () => {

    const intialFilter = {
        // sort_by: '',
        // 'release_date.gte': '',
        // 'release_date.lte': '',
        with_genres: [],
        // with_original_language: 'none seleted',
        with_watch_providers: [],
        'vote_average.gte': 0,
        'vote_average.lte' : 10,
        'with_runtime.gte': 0,
        'with_runtime.lte': 400,
        watch_region: 'SA',
        with_keywords: []
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
    },[lang,filter]);

    useEffect(()=>{
         console.log(moviesFilter)
    },[moviesFilter])

    const discoverMovies = ()=> {
        setPage(1);
         const a = []

        for (let [key, value] of Object.entries(moviesFilter)) {
            if(value.length || typeof value === 'number') {
                a.push(`&${key}=${typeof value === "object" ? value.toString().replaceAll(',','_') : value}`)
                
            }
        }
        console.log(a);
        fetchData(`discover/movie?include_adult=false&page=${page}${a.toString().replaceAll(',','')}`)
        .then((data)=> {
            setMovies(data);
            console.log(data,`discover/movie?include_adult=false${a.toString().replaceAll(',','')}`);
        })
    };

    const loadMore = (is)=> {

        if(is === true){
            fetchData(`movie/${filter}?language=${lang}&page=${page + 1}`)
            .then((data)=> {
                setMovies(prev=> {
                    return {
                        ...prev,
                        results: [...movies.results,...data.results]
                    }
                });
                console.log(data);
            })   
        }
        setPage(prev=> prev + 1);
    }

  return (
    <movieFilter.Provider value={{moviesFilter,setMoviesFilter}}>
        <main className="movies">
            <div className="movies-container">
                <div className="filters-box">
                    <MovieTvFilter />
                    <button className="filter-btn" onClick={discoverMovies}>
                        serach
                    </button>
                </div>

                <div className="movies-box">
                    <div className="movies-content">
                        {
                            movies?.results?.map((movie)=> (
                                <MovieCard key={movie?.id} movie={movie} type='movie'/>
                            ))
                        }

                    </div>
                    {/* <PageNumber page={page} setPage={setPage} totalPages={movies?.total_pages}/> */}
                    <button className="filter-btn" onClick={()=> loadMore(true)}>
                        laod more
                    </button>
                </div>

            </div>
        </main>
    </movieFilter.Provider>
  )
}

export default Movies