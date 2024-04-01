import { useContext, useEffect, useState } from "react"

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import "./TopBilledCast.scss";
import { Link } from "react-router-dom";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import PersonCard from "../../personComponents/PersonCard/PersonCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import { languages } from "../../../utilities/languages";


const TopBilledCast = ({mediaType,id})=> {

    const {lang,theme} = useContext(globalContext);

    const [cast,setCast] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetch = ()=>{
        setIsPending(true);
        setError(null);
       fetchData(`${mediaType}/${id}/credits?language=${lang}`)
       .then((data)=>{
            setCast(data?.cast);
       })
       .catch(error=> {
          setError(error);
       })
       .finally(()=> {
           setIsPending(false);
       })
    }

    useEffect(fetch,[id,lang,mediaType]);

  return (
    <section className="top-billed b-b">
        <h4 className={`title t-color-${theme}`}>
            {languages[lang].seriesCast}
        </h4>
        <div className="persons">
            {
                isPending ? <Loading width='100%' height='340px' /> : cast ?
                cast?.map((person,i)=>(
                    i < 11 &&
                    <PersonCard key={person?.id} person={person} />
                ))
                : error && <Error error={error} height='340px' onClick={fetch} />
            }
            <div className="view-more">
                <Link 
                    to={`/movie/${id}/castCrew`} 
                    className="cast-link link-color"
                    >
                        {languages[lang].viewMore} <ArrowRightAltRoundedIcon />
                </Link>
                
            </div>
        </div>
        <Link 
            to={`/movie/${id}/castCrew`} 
            className="cast-link link-color"
            >
                {languages[lang].allCrew}
        </Link>
    </section>
  )
}

export default TopBilledCast