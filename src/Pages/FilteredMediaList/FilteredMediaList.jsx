
import { createContext, useContext, useEffect, useState } from "react";
import "./FilteredMediaList.scss";
import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/movieComponents/movieCard/MovieCard";
import MediaFilter from "../../Components/mediaFilterComponents/MedidaFilter";
import Error from "../../Components/error/Error";
import Loading from "../../Components/loading/Loading";

export const mediaFilter = createContext();

const intialFilter = {
    with_genres: [],
    with_watch_providers: [],
    'vote_average.gte': 0,
    'vote_average.lte' : 10,
    'with_runtime.gte': 0,
    'with_runtime.lte': 400,
    watch_region: 'SA',
    with_keywords: []
}


const FilteredMediaList = ({mediaType}) => {

    const {lang} = useContext(globalContext);

    const [meida,setMedia] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [mediaFiltering,setMediaFiltering] = useState(intialFilter);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);

    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const [isFilteredLoading,setIsFilteredLoading] = useState(false);
    const [filteredError,setFilteredError] = useState(null);

    const {filter}= useParams();

    const fetchMedia = ()=>{

        document.title = `${filter} ${mediaType}`;
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${filter}?language=${lang}&page=${page}`)
        .then((data)=> {
            setMedia(data);
            setTotalPage(data?.total_pages);
            setIsPending(false);
            console.log(data);
        }) 
        .catch((error)=> {
            setError(error);
            setIsPending(false);
        })  
    }

    useEffect(fetchMedia,[lang,filter,mediaType]);

    useEffect(()=>{
         console.log(mediaFiltering)
    },[mediaFiltering,mediaType])

    const fetchFilteredMedia = async ()=> {

        setIsFilteredLoading(true);
        setFilteredError(null);
        setPage(1);
         const filterKeysList = [];
        for (let [key, value] of Object.entries(mediaFiltering)) {
            if(value.length || typeof value === 'number') {
                filterKeysList.push(`&${key}=${typeof value === "object" ? value?.toString().replaceAll(',','|') : value}`)   
            }
        }
        console.log(filterKeysList);
       await fetchData(`discover/${mediaType}?include_adult=false&page=${page}${filterKeysList.toString().replaceAll(',','')}`)
        .then((data)=> {
            setMedia(data);
            console.log();
            setTotalPage(data?.total_pages);
            setIsFilteredLoading(false);
            setFilteredError(null);
        })
        .catch(error=> {
            setFilteredError(error);
            setIsFilteredLoading(false);
        })
    };

    const loadMore = (is)=> {
        if(page + 1 < totalPage && isLoadingMore === false) {
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
    }

  return (
    <mediaFilter.Provider value={{mediaFiltering,setMediaFiltering}}>
        {
            isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> : 
            meida ? 
            <main className="movies">
                <section className="filterd-media">
                    <h4 className="filt-title">
                        {filter?.replaceAll('_',' ')} {mediaType}
                    </h4>
                    <div className="movies-container">
                        <div className="filters-box">
                            <MediaFilter mediaType={mediaType === 'movie' ? 'movies' : 'tv shows'} />
                            <button className="filter-btn card link-hover" onClick={fetchFilteredMedia}>
                                serach
                            </button>
                        </div>
                        <div className="movies-box">
                            <div className="movies-content">
                                {
                                    isFilteredLoading ? <Loading width='100%' height='calc(100vh - 100px)' /> :
                                    meida?.results?.length === 0 ?
                                    <div className="not-found">
                                        <h4 className="text">no media found</h4>
                                    </div>  :
                                    meida?.results?.length  > 0 ?
                                    meida?.results?.map((movie)=> (
                                        <MovieCard key={movie?.id} movie={movie} type={mediaType}/>
                                    ))
                                    : filteredError && <Error error={error}  height='calc(100vh - 100px)' onClick={fetchFilteredMedia} />
                                }

                            </div>
                            {
                                page + 1 < totalPage && 
                                <button 
                                    disabled={isLoadingMore}
                                    className={`${isLoadingMore && 'loading'} filter-btn card link-hover`} 
                                    onClick={()=> loadMore(true)}
                                    >
                                    { isLoadingMore ? <span>loading... </span>:'laod more'}
                                </button>
                            }
                        </div>
                    </div>
                </section>
            </main>
            : error && <Error error={error}  height='calc(100vh - 100px)' onClick={fetchMedia} />
        }
    </mediaFilter.Provider>
  )
}

export default FilteredMediaList