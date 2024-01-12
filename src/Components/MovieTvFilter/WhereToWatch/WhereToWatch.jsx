
import { useContext, useEffect, useState } from "react";
import "./WhereToWatch.scss";
import fetchData from "../../../Utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "../Sort/Sort.scss";

const WhereToWatch = () => {

    const [countries,setCountries] = useState([]);
    const [providers,setProviders] = useState([]);

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
          
    },[lang,filter]);

  return (
    <section className="sort">
        <h5 className="filter-t">
            Where To Watch <ChevronRightIcon />
        </h5>
        <div className="sort-content">
            <section className="country">
                <h5 className="c-ti">
                    country
                </h5>
                <select className="selecteions">
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
  )
}

export default WhereToWatch