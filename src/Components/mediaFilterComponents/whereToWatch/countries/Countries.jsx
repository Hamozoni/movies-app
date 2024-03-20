import { useContext, useEffect, useState } from "react";
import { mediaFilter } from "../../../../Pages/filteredMediaList/FilteredMediaList";
import SearchIcon from '@mui/icons-material/Search';
import fetchData from "../../../../utilities/fetchData";
import { globalContext } from "../../../../GlobalStateContext/GlobalContext";

const Countries = () => {

    const [countries,setCountries] = useState([]);
    const{mediaFiltering,setMediaFiltering} = useContext(mediaFilter);
    const {lang} = useContext(globalContext);

    useEffect(()=> {
        fetchData(`configuration/countries?language=${lang}`)
        .then((data)=> {
            setCountries(data);
            console.log(data)
        })
    },[lang]);

  return (
    <section className="countries-list">
        <div className="selected-coun">
            <h4>Saudi Arabia</h4>
        </div>
        <div className="coun-container">
            <div className="cont-search">
                <input type="text" />

            </div>
        </div>
        <ul
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
                    <li 
                        key={country?.native_name} 
                        value={country?.iso_3166_1}
                        >
                          
                            <span>
                                {country?.native_name} 

                            </span>

                        </li>
                ))
            }
        </ul>
    </section>
  )
}

export default Countries