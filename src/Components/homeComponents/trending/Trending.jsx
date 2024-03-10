import { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utilities/fetchData";
import { languages } from "../../../Utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import MovieCard from "../../movieComponents/movieCard/MovieCard";
import "./Trending.scss";

const Trending = ({type})=> {

    const {lang} = useContext(globalContext);

    const [movies,setMovies] = useState([]);
    const [filter,setFilter] = useState('day');

    useEffect(()=>{
        fetchData(`trending/${type}/${filter}?language=${lang}&page=1`)
        .then((data)=>{
            setMovies(data?.results)
            console.log(data?.results);
        })
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