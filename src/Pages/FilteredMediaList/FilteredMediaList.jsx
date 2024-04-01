
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import "./FilteredMediaList.scss";

import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { languages } from "../../utilities/languages";

import MovieCard from "../../Components/movieComponents/movieCard/MovieCard";
import MediaInlineCard from "../../Components/sharedComponents/mediaInlineCard/MediaInlineCard";
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

    const {lang,innerWidth,theme} = useContext(globalContext);
    const {filter}= useParams();

    const [meida,setMedia] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [mediaFiltering,setMediaFiltering] = useState(intialFilter);
    const [page,setPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    const [filteredError,setFilteredError] = useState(null);


    const findTilte = ()=> {

        if(filter.indexOf('_') !== -1){
            const newFilter = filter.split("_")
            const firstChar = newFilter[1].split('').shift().toUpperCase();
            const title = `${newFilter[0]}${firstChar}${newFilter[1].slice(1)}`
            return `${languages[lang][title]} ${languages[lang][mediaType]}`
        }else {
            return `${languages[lang][filter]} ${languages[lang][mediaType]}`
        }
    };

    const title = useMemo(findTilte,[filter,lang,mediaType]);

    const fetchMedia = ()=>{

        document.title = title;
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${filter}?language=${lang}&page=1`)
        .then((data)=> {
            setMedia(data);
            setTotalPage(data?.total_pages);
        }) 
        .catch((error)=> {
            setError(error);
        }) 
        .finally(()=> {
            setIsPending(false);
        }) 
    }

    useEffect(fetchMedia,[lang,filter,mediaType,title]);

    const [isFilteredLoading,setIsFilteredLoading] = useState(false);

    const fetchFilteredMedia = ()=> {
        setIsFilteredLoading(true);
        setFilteredError(null);
        setPage(1);
         const filterKeysList = new URLSearchParams(mediaFiltering).toString();
       fetchData(`discover/${mediaType}?include_adult=false&page=1${filterKeysList}`)
        .then((data)=> {
            setMedia(data);
            setTotalPage(data?.total_pages);
            console.log(data)
        })
        .catch(error=> {
            setFilteredError(error);
        })
        .finally(()=> {
            setIsFilteredLoading(false);
        })
    };

    
    const [isLoadingMore,setIsLoadingMore] = useState(false);

    const loadMore = ()=> {
        setIsLoadingMore(true);
        if(page + 1 < totalPage) {
                fetchData(`${mediaType}/${filter}?language=${lang}&page=${page + 1}`)
                .then((data)=> {
                    setMedia(prev=> {
                        return {
                            ...prev,
                            results: [...meida.results,...data.results]
                        }
                    })
                    setPage(prev=> prev + 1);
                })
                .catch((error)=> {
                    setError(error)
                })
                .finally(()=> {
                    setIsLoadingMore(false)
                })  

        }
    }

  return (
    <mediaFilter.Provider value={{mediaFiltering,setMediaFiltering}}>
        {
            isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> : 
            meida ? 
            <main className="movies">
                <section className="filterd-media">
                    <h4 className={`t-color-${theme} filt-title`}>
                        {title}
                    </h4>
                    <div className={`${innerWidth > 676 && 'web'} movies-container`}>
                        <div className="filters-box">
                            <MediaFilter mediaType={mediaType === 'movie' ? 'movies' : 'tv shows'} />
                            <button 
                                className={`back-color-${theme}-2 t-color-${theme} filter-btn card link-hover`} 
                                onClick={fetchFilteredMedia}
                                >
                                    {
                                        isFilteredLoading ? 
                                        <span className="loading-more">
                                            <span className={`back-color-${theme}-3 s-1`}></span>
                                            <span className={`back-color-${theme}-4 s-2`}></span>
                                            <span className={`back-color-${theme}-5 s-2`}></span>
                                        </span> 
                                      : languages[lang].search
                                    }
                            
                            </button>
                        </div>
                        <div className="movies-box">
                            <div className="movies-content">
                                {
                                    isFilteredLoading ? <Loading width='100%' height='calc(100vh - 100px)' /> :
                                    meida?.results?.length === 0 ?
                                    <div className="not-found">
                                        <h4 className={`t-colot-${theme} text`}>
                                            {lang === 'en' ? 'no media found' : 'لا يوجد نتائج'}
                                        </h4>
                                    </div>  :
                                    meida?.results?.length  > 0 ?
                                    meida?.results?.map((movie)=> (
                                        innerWidth < 676 ? 
                                        <MediaInlineCard  key={movie?.id} movie={movie} type={mediaType} />
                                        :
                                        <MovieCard key={movie?.id} movie={movie} type={mediaType}/>
                                    ))
                                    : filteredError && <Error error={error}  height='calc(100vh - 100px)' onClick={fetchFilteredMedia} />
                                }

                            </div>
                            {
                                page + 1 < totalPage && 
                                <button 
                                    disabled={isLoadingMore}
                                    className={`back-color-${theme}-2 t-color-${theme} filter-btn card link-hover`} 
                                    onClick={()=> loadMore(true)}
                                    >
                                    { isLoadingMore ? 
                                       <span className="loading-more">
                                           <span className={`back-color-${theme}-3 s-1`}></span>
                                           <span className={`back-color-${theme}-4 s-2`}></span>
                                           <span className={`back-color-${theme}-5 s-2`}></span>
                                       </span> 
                                       : languages[lang].loadMore}
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