import { useContext, useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import { languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import MovieCard from "../../movieComponents/movieCard/MovieCard";
import "./Trending.scss";
import Error from "../../error/Error";
import Loading from "../../loading/Loading";

const Trending = ({type})=> {

    const {lang} = useContext(globalContext);

    const [movies,setMovies] = useState([]);
    const [filter,setFilter] = useState('day');
    const [isPending,setPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
        setPending(true);
        fetchData(`trending/${type}/${filter}?language=${lang}&page=1`)
        .then((data)=>{
            setError(null);
            setMovies(data?.results);
            setPending(false);
            console.log(data?.results);
        })
        .catch(error=> {
            setPending(false);
            error(error)

        });

    },[lang,filter]);

    return (
        <section className={`${type} trending`}>
            <div className="trending-container">
                <header className="trend-header">
                    <h3 className="trend-title">
                        {languages[lang].trending + " "}  
                        {type === 'movie' ? languages[lang].movies : type === 'tv'  ? languages[lang].tvShows :languages[lang].people }
                    </h3>
                    <nav className="trend-nav">
                        <ul>
                            <li 
                                className={filter === 'day' && 'active'}
                                onClick={()=> setFilter('day')}
                                >
                                {languages[lang].today}
                           </li>
                            <li 
                                className={filter === 'week' && 'active'}
                                onClick={()=> setFilter('week')}
                                >
                                {languages[lang].thisWeek}
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="movies">
                     {
                        isPending ? <Loading width='100%' height='350px' />  
                        :  error ? <Error error={error}/> : 
                        movies?.map((movie)=>(
                            <MovieCard movie={movie} type={type} />
                        ))
                     }
                </div>
            </div>  
        </section>
    );
};

export default Trending;