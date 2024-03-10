
import { useContext, useEffect, useState } from "react";
import "./WhereToWatch.scss";
import fetchData from "../../../Utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';

import "../Filters/Sort/Sort.scss";
import { mediaFilter } from "../../../Pages/filteredMediaList/FilteredMediaList";


const WhereToWatch = () => {

    const{mediaFiltering,setMediaFiltering} = useContext(mediaFilter);

    const [countries,setCountries] = useState([]);
    const [providers,setProviders] = useState([]);

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{
        fetchData(`configuration/countries?language=${lang}`)
        .then((data)=> {
            setCountries(data);
            console.log(data)
        })
        fetchData(`watch/providers/movie?language=${lang}&watch_region=${mediaFiltering.watch_region}`)
        .then((data)=> {
            setProviders(data?.results);
            console.log(data?.results);
        })
          
    },[lang,filter,mediaFiltering.watch_region]);

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
                <select
                    onChange={(e)=> setMediaFiltering(prev=> {
                        return {
                            ...prev,
                            watch_region: e.target.value
                        }
                    })} 
                    value={mediaFiltering.watch_region}
                    className="selections">
                    {
                        countries?.map((country)=>(
                            <option 
                                key={country?.native_name} 
                                value={country?.iso_3166_1}
                                >
                                     <div>
                                        <img src={`https://flagsapi.com/${country?.iso_3166_1 }/shiny/64.png`}></img>
                                        <span>
                                            {country?.native_name} 

                                        </span>

                                     </div>
                                </option>
                        ))
                    }
                </select>
                <div className="movie-providers">
                    {
                        providers?.map((provider)=> (
                            <div 
                                onClick={()=> setMediaFiltering(prev=> {
                                    return {
                                        ...prev,
                                        with_watch_providers: prev.with_watch_providers?.includes(provider.provider_name) ? 
                                            prev.with_watch_providers.filter(el=> el !== provider.provider_name ) :
                                            [...prev.with_watch_providers,provider.provider_name]
                                    }
                                })}
                                key={provider?.provider_id} 
                                className="provider-image"
                                >
                                <img 
                                    loading="lazy" 
                                    src={process.env.REACT_APP_BASE_URL + "original" + provider?.logo_path}
                                    alt="" 
                                />
                                <div className="overlay name">
                                    <span>{provider.provider_name}</span>
                                </div>
                                {
                                    mediaFiltering.with_watch_providers?.includes(provider.provider_name) &&
                                    <div className="overlay">
                                        <CheckIcon />
                                    </div>
                                }
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