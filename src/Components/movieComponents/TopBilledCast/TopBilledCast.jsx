import { useContext, useEffect, useState } from "react"

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import "./TopBilledCast.scss";
import { Link } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import PersonCard from "../PersonCard/PersonCard";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const TopBilledCast = ({mediaType,id,title})=> {

    const {lang} = useContext(globalContext);

    const [cast,setCast] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetch = ()=>{
        setIsPending(true);
        setError(null)
       fetchData(`${mediaType}/${id}/credits?language=${lang}`)
       .then((data)=>{
            setCast(data?.cast);
            setIsPending(false);
            console.log(data);
       })
       .catch(error=> {
          setError(error);
          setIsPending(false);
       })
    }

    useEffect(fetch,[id,lang]);

  return (
    <section className="top-billed b-b">
        <h4 className="title">{title}</h4>

        <div className="persons">
            {
                 isPending ? <Loading width='100%' height='340px'/> : cast?.length ? 
                    
                cast?.map((person,i)=>(
                    i < 11 &&
                    <PersonCard key={person?.id} person={person} />
                ))
                
                : error && <Error error={error} height='340px' onClick={fetch}/>
            }
            <div className="view-more">
                <Link to={`/${mediaType}/${id}/cast`} className="cast-link">view more <ArrowRightAltRoundedIcon /></Link>
                
            </div>
        </div>

        <Link to={`/${mediaType}/${id}/cast`} className="cast-link">full cast & crew</Link>
    </section>
  )
}

export default TopBilledCast