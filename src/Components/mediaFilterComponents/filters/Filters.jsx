import { useContext, useEffect, useState } from "react";
import SortingGauge from "./sortingGauge/SortingGauge"
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import fetchData from "../../../utilities/fetchData";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./Filters.scss";
import { mediaFilter } from "../../../Pages/filteredMediaList/FilteredMediaList";
import Keywords from "./keywords/Keywords";
import LanguagesCountries from "../languages&countries/LanguagesCountries";

const Filters = () => {

    const {mediaFiltering,setMediaFiltering} = useContext(mediaFilter);

    const [genres,setGenres] = useState([]);
    const [isOpen,setIsOpen] = useState(false);


    const {lang,languages} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{

        fetchData(`genre/movie/list?language=en`)
        .then((data)=>{
            setGenres(data?.genres);
        })
   
    },[lang,filter]);

  return (
    <section className="sort card">
        <h5 className="filter-t" onClick={()=> setIsOpen(!isOpen)}>
            filters {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </h5>
        {
            isOpen &&
            <div className="fliter-content">
                <section className="sort-content">
                    <h5 className="c-ti">show me</h5>
                    <div className="show-content">
                        <div className="option">
                            <input type="radio" name="show-me" id="everything" />
                            <label htmlFor="everything">Everything</label>
                        </div>
                        <div className="option">
                            <input type="radio" name="show-me" id="haven't" />
                            <label htmlFor="haven't">Movies I Haven't Seen</label>
                        </div>
                        <div className="option">
                            <input type="radio" name="show-me" id="have" />
                            <label htmlFor="have">Movies I Have Seen</label>
                        </div>

                    </div>
                </section>
                <section className="sort-content">
                    <h5 className="c-ti">Release Dates</h5>
                    <div className="release-cont">
                        <div className="release-date">
                            <label className="c-ti" htmlFor="from-date"> from</label>
                            <input 
                                onBlur={(e)=> setMediaFiltering(prev=> {return {...prev,'release_date.gte': [e.target.value]}})} 
                                type="date" id="from-date" />

                        </div>
                        <div className="release-date">
                            <label className="c-ti" htmlFor="to-date"> to</label>
                            <input
                                onBlur={(e)=> setMediaFiltering(prev=> {return {...prev,'release_date.lte': [e.target.value]}})} 
                                type="date" name="to-date" id="to-date" />
                        </div>
                    </div>
                </section>
                <section className="sort-content">
                    <h5 className="c-ti">
                        genres
                    </h5>
                    <nav className="gen-nav">
                        <ul className="genr-ul">
                            {
                                genres?.map((gen)=>(
                                    <li 
                                        className={mediaFiltering.with_genres?.includes(gen.name) && 'active'}
                                        onClick={()=> setMediaFiltering(prev=> {
                                            return {
                                                ...prev,
                                                with_genres : prev?.with_genres?.includes(gen.name) ? 
                                                    prev?.with_genres.filter((el)=> el !== gen.name) :
                                                    [...prev?.with_genres,gen.name] 
                                            }
                                        })}
                                        key={gen?.id}
                                        >
                                            {gen?.name}
                                </li>
                                ))
                            }
                        </ul>
                    </nav>
                </section>
                <section className="sort-content">
                    <LanguagesCountries type='languages' data={languages} />
                </section>
                <section className="sort-content">
                <SortingGauge  title="Minimum User Votes" renderFrom='rating'/>
                </section>
                {/* <section className="sort-content">
                <SortingGauge />
                </section> */}
                <section className="sort-content">
                <SortingGauge title="runtime" renderFrom='runtime'/>
                </section>
                <section className="sort-content">
                    <Keywords />
                </section>
            </div>
        }
    </section>
  )
}

export default Filters