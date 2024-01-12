import { useContext, useEffect, useState } from "react";
import SortingGauge from "./SortingGauge/SortingGauge"
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import fetchData from "../../../Utilities/fetchData";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "./Filters.scss";
import Languages from "./Languages/Languages";

const Filters = () => {

    const [genres,setGenres] = useState([]);


    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{

        fetchData(`genre/movie/list?language=en`)
        .then((data)=>{
            setGenres(data?.genres);
        })
   
    },[lang,filter]);

  return (
    <section className="sort">
        <h5 className="filter-t">
            filters <ChevronRightIcon />
        </h5>
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
                        <input type="date" name="from-date" id="from-date" />

                    </div>
                    <div className="release-date">
                        <label className="c-ti" htmlFor="to-date"> to</label>
                        <input type="date" value={new Date()} name="to-date" id="to-date" />
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
                                <li key={gen?.id}>{gen?.name}</li>
                            ))
                        }
                    </ul>
                </nav>
            </section>
            <section className="sort-content">
                <Languages />
            </section>
            <section className="sort-content">
               <SortingGauge  title="Minimum User Votes"/>
            </section>
            <section className="sort-content">
               <SortingGauge />
            </section>
            <section className="sort-content">
               <SortingGauge title="runtime"/>
            </section>
        </div>
    </section>
  )
}

export default Filters