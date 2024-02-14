
import { createContext, useContext, useEffect, useState } from "react";
import "./FilteredMediaList.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard/MovieCard";
import MovieTvFilter from "../../Components/MovieTvFilter/MovieTvFilter";

export const meidaFilter = createContext();


const FilteredMediaList = ({mediaType}) => {

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

    const [meida,setMedia] = useState([]);
    const [mediaFiltering,setMediaFiltering] = useState(intialFilter);
    const [page,setPage] = useState(1);
    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const {filter}= useParams()

    useEffect(()=>{
        fetchData(`${mediaType}/${filter}?language=${lang}&page=${page}`)
        .then((data)=> {
            setMedia(data);
            console.log(data);
        })   
    },[lang,filter]);

    useEffect(()=>{
         console.log(mediaFiltering)
    },[mediaFiltering,mediaType])

    const discoverMovies = ()=> {
        setPage(1);
         const a = []

        for (let [key, value] of Object.entries(mediaFiltering)) {
            if(value.length || typeof value === 'number') {
                a.push(`&${key}=${typeof value === "object" ? value.toString().replaceAll(',','_') : value}`)
                
            }
        }
        console.log(a);
        fetchData(`discover/${mediaType}?include_adult=false&page=${page}${a.toString().replaceAll(',','')}`)
        .then((data)=> {
            setMedia(data);
            console.log(data,`discover/${mediaType}?include_adult=false${a.toString().replaceAll(',','')}`);
        })
    };

    const loadMore = (is)=> {
        setIsLoadingMore(true)
        if(is === true){
            fetchData(`${mediaType}/${filter}?language=${lang}&page=${page + 1}`)
            .then((data)=> {
                setMedia(prev=> {
                    return {
                        ...prev,
                        results: [...meida.results,...data.results]
                    }
                });
            setIsLoadingMore(false)
            })   
        }
        setPage(prev=> prev + 1);
    }

  return (
    <meidaFilter.Provider value={{moviesFilter: mediaFiltering,setMoviesFilter: setMediaFiltering}}>
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
                            meida?.results?.map((movie)=> (
                                <MovieCard key={movie?.id} movie={movie} type={mediaType}/>
                            ))
                        }

                    </div>
                    {/* <PageNumber page={page} setPage={setPage} totalPages={movies?.total_pages}/> */}
                    <button 
                        disabled={isLoadingMore}
                        className={`${isLoadingMore && 'active'} filter-btn`} 
                        onClick={()=> loadMore(true)}
                        >
                        { isLoadingMore ? <span>loading... </span>:'laod more'}
                    </button>
                </div>

            </div>
        </main>
    </meidaFilter.Provider>
  )
}

export default FilteredMediaList