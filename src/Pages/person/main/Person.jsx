import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


import "./person.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import PersonCover from "../../../Components/personComponents/PersonCover/PersonCover";

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