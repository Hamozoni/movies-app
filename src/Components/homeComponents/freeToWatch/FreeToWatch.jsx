import { useContext, useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import MovieCard from "../../movieComponents/movieCard/MovieCard";
import { languages } from "../../../utilities/languages";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const FreeToWatch = ()=> {

    const {lang,theme} = useContext(globalContext);
    const [mediaType,setMediaType] = useState('movie');
    const [media,setMedia] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetch = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`discover/${mediaType}?language=${lang}&page=1&with_watch_monetization_types=free`)
        .then((data)=> {
            setMedia(data?.results);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetch,[mediaType,lang]);

    return (
        <div className="free-to-watch">
            <section className={`free-to-watch trending`}>
                <div className="trending-container">
                    <header className="trend-header">
                        <h3 className={`trend-title t-color-${theme}`}>
                            {languages[lang].freeToWatch}
                        </h3>
                        <nav className="trend-nav">
                            <ul>
                                <li 
                                    className={mediaType === 'movie' && 'active'}
                                    onClick={()=> setMediaType('movie')}
                                    >
                                    {languages[lang].movies}
                            </li>
                                <li 
                                    className={mediaType === 'tv' && 'active'}
                                    onClick={()=> setMediaType('tv')}
                                    >
                                    {languages[lang].tvShows}
                                </li>
                            </ul>
                        </nav>
                    </header>
                    <div className="movies">
                        {
                            isPending ? <Loading width='100%' height='350px' /> :
                            media?.length ?
                            media?.map((movie)=>(
                                <MovieCard movie={movie} type={mediaType} />
                            ))
                            : error && <Error error={error}  height='350px' onClick={fetch} /> 
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FreeToWatch;