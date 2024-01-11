import { useContext, useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import SortingGauge from "./SortingGauge/SortingGauge";
import Sort from "./Sort/Sort";


const MovieTvFilter = () => {

    const [countries,setCountries] = useState([]);
    const [providers,setProviders] = useState([]);
    const [genres,setGenres] = useState([]);
    const [languages,setLanguages] = useState([]);

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{
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
        <Sort />
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
            <SortingGauge />
        </section>

    </section>
  )
}

export default MovieTvFilter