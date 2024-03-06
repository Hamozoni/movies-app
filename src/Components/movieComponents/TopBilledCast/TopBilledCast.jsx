import { useContext, useEffect, useState } from "react"

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import "./TopBilledCast.scss";
import { Link } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import PersonCard from "../PersonCard/PersonCard";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

const TopBilledCast = ({type,id,title})=> {

    const {lang} = useContext(globalContext);

    const [cast,setCast] = useState([]);

    useEffect(()=>{
       fetchData(`${type}/${id}/credits?language=${lang}`)
       .then((data)=>{
            setCast(data?.cast);
       })
    },[id,lang]);

  return (
    <section className="top-billed">
        <h4 className="title">{title}</h4>
        <div className="persons">
            {
                cast?.map((person,i)=>(
                    i < 11 &&
                    <PersonCard key={person?.id} person={person} />
                ))
            }
            <div className="view-more">
                <Link to={`/movie/${id}/cast`} className="cast-link">view more <ArrowRightAltRoundedIcon /></Link>
                
            </div>
        </div>
        <Link to={`/movie/${id}/cast`} className="cast-link">full cast & crew</Link>
    </section>
  )
}

export default TopBilledCast