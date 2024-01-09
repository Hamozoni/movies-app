
import { useContext, useEffect, useState } from "react";
import "./Movies.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import MovieCard from "../../Components/MovieCard/MovieCard";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Movies = () => {
    const {lang} = useContext(globalContext);

    const [movies,setMovies] = useState([]);

    const [countries,setCountries] = useState([]);
    const [providers,setProviders] = useState([]);

    const {filter}= useParams()

    useEffect(()=>{
        fetchData(`movie/${filter}?language=${lang}&page=1`)
        .then((data)=> {
            setMovies(data);
            console.log(data);
        })
        fetchData(`configuration/countries?language=${lang}`)
        .then((data)=> {
            setCountries(data)
        })
        fetchData(`watch/providers/movie?language=${lang}&watch_region=SA`)
        .then((data)=> {
            setProviders(data?.results);
        })

       
    },[lang,filter]);

  return (
    <main className="movies">
        <div className="movies-container">
            <section className="filters">
                <h4 className="filt-title">
                    {filter?.replace('_',' ')} Movies
                </h4>
                <section className="sort">
                     <h4 className="ti">
                        sort <ChevronRightIcon />
                     </h4>
                     <div className="sort-content">
                        <h5 className="c-ti">
                           Sort Results By 
                        </h5>
                        <select name="" id="">
                            <option value="popularty.desc">popularty descending</option>
                            <option value="popularty.asc">popularty ascending</option>
                            <option value="vote_average.desc">rating descending</option>
                            <option value="vote_average.asc">rating ascending</option>
                            <option value="primary_release_date.desc">release date descending</option>
                            <option value="primary_release_date.asc">release date ascending</option>
                        </select>
                     </div>
                </section>
                <section className="watch">
                     <h5 className="w-ti">
                         Where To Watch <ChevronRightIcon />
                     </h5>
                     <div className="watch-content">
                        <section className="country">
                            <h5 className="c-ti">
                                country
                            </h5>
                            <select name="" id="">
                                 {
                                    countries?.map((country)=>(
                                        <option 
                                            key={country?.native_name} 
                                            value={country?.iso_3166_1}
                                            >
                                                {country?.native_name} 
                                            </option>
                                    ))
                                 }
                            </select>
                            <div className="movie-providers">
                                {
                                    providers?.map((provider)=> (
                                        <div key={provider?.provider_id} className="provider-image">
                                            <img 
                                               loading="lazy" 
                                               src={process.env.REACT_APP_BASE_URL + "original" + provider?.logo_path}
                                               alt="" 
                                               />

                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                     </div>
                </section>
                <section className="filter">
                     <h5 className="fil-ti">
                        filters <ChevronRightIcon />
                     </h5>
                     <div className="show-me">
                        <h5>show me</h5>
                        <label htmlFor="everything">Everything</label>
                        <input type="radio" name="show-me" id="everything" />

                        <label htmlFor="haven't">Movies I Haven't Seen</label>
                        <input type="radio" name="show-me" id="haven't" />

                        <label htmlFor="have">Movies I Have Seen</label>
                        <input type="radio" name="show-me" id="have" />
                     </div>
                </section>

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