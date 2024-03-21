
import { useContext, useEffect, useState } from "react";
import "./WhereToWatch.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "../sort/Sort.scss";
import { mediaFilter } from "../../../Pages/filteredMediaList/FilteredMediaList";
import LanguagesCountries from "../languages&countries/LanguagesCountries";




const WhereToWatch = () => {

    const{mediaFiltering,setMediaFiltering} = useContext(mediaFilter);


    const [providers,setProviders] = useState([]);
    const [isOpen,setIsOpen] = useState(true);

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{
        fetchData(`watch/providers/movie?language=${lang}&watch_region=${mediaFiltering.watch_region}`)
        .then((data)=> {
            setProviders(data?.results);
            console.log(data?.results);
        })
          
    },[lang,filter,mediaFiltering.watch_region]);

  return (
    <section className="sort card">
        <h5 className="filter-t" onClick={()=> setIsOpen(!isOpen)}>
            Where To Watch{ isOpen ?< ExpandMoreIcon /> : <ChevronRightIcon />}
        </h5>
        {
            isOpen &&
            <div className="sort-content">
                <section className="country">
                    <LanguagesCountries type='countries'/>
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
        }
    </section>
  )
}

export default WhereToWatch