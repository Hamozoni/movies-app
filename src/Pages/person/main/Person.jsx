import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";


import "./person.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import PersonCover from "../../../Components/personComponents/PersonCover/PersonCover";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";

const Person = ()=> {

    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDetails = ()=>{

        setIsPending(true);
        setError(null);
        fetchData(`person/${id}?language=${lang}`)
        .then( data => {
            setDetails(data);
            setIsPending(false);
            console.log(data);
            document.title = data.name;
        })
        .catch(error=> {
            setError(error)
            setIsPending(false)
        })
    }

    useEffect(fetchDetails,[id,lang]);

    return (
        <div className="person">
            {
                isPending ? <Loading width='100%' height='calc(100vh - 100px)' /> : 
                details ?
                <PersonCover details={details} id={id}/>
                : error && <Error error={error} height='calc(100vh - 100px)'  onClick={fetchDetails}/>
            }
        </div>
    );
};

export default Person;