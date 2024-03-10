import { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import MovieCard from "../../movieComponents/movieCard/MovieCard";
import { languages } from "../../../Utilities/languages";

const FreeToWatch = ()=> {

    const {lang} = useContext(globalContext);
    const [mediaType,setMediaType] = useState('movie');
    const [media,setMedia] = useState([]);
    useEffect(()=>{
        fetchData(`discover/${mediaType}?language=${lang}&page=1&with_watch_monetization_types=free`)
        .then((data)=> {
            setMedia(data?.results);
        })
    },[mediaType]);

    return (
        <div className="free-to-watch">
            <section className={`free-to-watch trending`}>
                <div className="trending-container">
                    <header className="trend-header">
                        <h3 className="trend-title">
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
                            media?.map((movie)=>(
                                <MovieCard movie={movie} type={mediaType} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FreeToWatch;