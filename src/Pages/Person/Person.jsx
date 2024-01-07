import { useParams } from "react-router-dom";
import PersonCover from "../../Components/PersonCover/PersonCover";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";

import "./person.scss";

const Person = ()=> {

    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState({});

    useEffect(()=>{
        fetchData(`person/${id}?language=${lang}`)
        .then( data => {
            console.log(data);
            setDetails(data);
        })
    },[id,lang]);

    return (
        <div className="person">
           <PersonCover details={details} id={id}/>
        </div>
    );
};

export default Person;