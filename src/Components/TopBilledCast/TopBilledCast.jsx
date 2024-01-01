import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import PersonCard from "../PersonCard/PersonCard";

import "./TopBilledCast.scss";

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
                cast?.map((person)=>(
                    <PersonCard key={person?.id} person={person} />
                ))
            }
        </div>
        <h5 className="full-cast">full cast & crew</h5>
    </section>
  )
}

export default TopBilledCast