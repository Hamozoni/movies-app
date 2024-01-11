import { useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";


const MovieTvFilter = () => {

    const [countries,setCountries] = useState([]);
    const [providers,setProviders] = useState([]);
    const [genres,setGenres] = useState([]);
    const [languages,setLanguages] = useState([]);

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

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
        fetchData(`genre/movie/list?language=en`)
        .then((data)=>{
            setGenres(data?.genres);
        })
        fetchData(`configuration/languages `)
        .then((data)=>{
            setLanguages(data);
        })

        
    },[lang,filter]);




  return (
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
                <div className="show-content">
                    <label htmlFor="everything">Everything</label>
                    <input type="radio" name="show-me" id="everything" />

                    <label htmlFor="haven't">Movies I Haven't Seen</label>
                    <input type="radio" name="show-me" id="haven't" />

                    <label htmlFor="have">Movies I Have Seen</label>
                    <input type="radio" name="show-me" id="have" />

                </div>
            </div>
            <section className="release-date">
                <h5>Release Dates</h5>
                <div className="release-cont">
                    <div className="from-d">
                        <label htmlFor="from-date"> from</label>
                        <input type="date" name="from-date" id="from-date" />

                    </div>
                    <div className="to-d">
                    <label htmlFor="to-date"> to</label>
                        <input type="date" name="to-date" id="to-date" />
                    </div>
                </div>
            </section>
            <section className="genres">
                <h5 className="gen-ti">
                    genres
                </h5>
                <nav className="gen-nav">
                    <ul className="genr-ul">
                        {
                            genres?.map((gen)=>(
                                <li key={gen?.id}>{gen?.name}</li>
                            ))
                        }
                    </ul>
                </nav>
            </section>
            <section className="lang">
                <h5 className="lang-ti">
                    language
                </h5>
                <div className="lang-box">
                    <header className="lang-header">
                        <input 
                            type="search" 
                            placeholder="Filter items based on their original language."
                            />
                    </header>
                    <div className="lang">
                        <ul>
                            {
                                languages?.map((lang)=>(
                                    <li key={lang?.iso_639_1}>{lang?.english_name}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </section>

    </section>
  )
}

export default MovieTvFilter