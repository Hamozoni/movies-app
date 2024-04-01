import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import "./person.scss";
import { personDetailsContext } from "../../../Layouts/PersonLayout";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import fitLongString from "../../../utilities/fitLongString";
import { languages } from "../../../utilities/languages";

import PersonStitistics from "../../../Components/personComponents/PersonStitistics/PersonStitistics";
import Loading from "../../../Components/loading/Loading";
import MovieCard from "../../../Components/movieComponents/movieCard/MovieCard";
import Error from "../../../Components/error/Error";
import PersonActing from "../../../Components/personComponents/PersonActing/PersonActing";


const Person = () => {

    const {id} = useParams();
    const { details} = useContext(personDetailsContext);
    const {lang,innerWidth,theme} = useContext(globalContext);

    const [knownFor,setKnownFor] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const fetchKnownFor = ()=>{

        setIsPending(true);
        setError(null);
        fetchData(`person/${id}/combined_credits?language=${lang}`)
        .then(data=> {
            setKnownFor(data);
        })
        .catch((error)=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetchKnownFor,[id,lang]);

  return (
    <section className="person-cover">
        <div className="per-cover-container">
            <div className="person-info">
                <div className="person-img">
                    <img 
                        className="image-hover"
                        src={process.env.REACT_APP_BASE_URL + 'w300' + details?.profile_path} 
                        alt={details?.name} 
                        />
                        {
                            innerWidth < 720 && 
                            <h3 className={`t-color-${theme} person-name`}>
                                {details?.name}
                            </h3>
                        }
                </div>
                <PersonStitistics details={details}/>
            </div>
            <div className="person-cov-content">
                <div className="person-name">
                    { 
                        innerWidth > 719 && 
                        <h3 className={`t-color-${theme}`}>
                            {details?.name}
                        </h3>
                    }
                </div>
                <div className="piagrahpy">
                    <h4 className={`pi-ti t-color-${theme}`}>
                         {languages[lang]?.biography}
                     </h4>
                    <aside className={`piag-text t-color-${theme}-2`}>
                         {fitLongString(details?.biography,1000) } 
                   </aside>
                </div>
                <section className="known-for">
                    <h4 className={`pi-ti t-color-${theme}`}>
                        {languages[lang]?.knownFor}
                    </h4>
                    {
                        isPending ? <Loading width='100%' height='300px' /> :
                        knownFor ?
                        <>
                            <div className="kn-for-container b-b">
                                {
                                    knownFor?.cast?.map((movie,i)=>(
                                        i < 6 &&
                                        <MovieCard key={movie.id} movie={movie}  type='movie'/>
                                    ))
                                }
                            </div>
                            <PersonActing knownFor={knownFor} />
                        </>
                         : error && <Error error={error}  height='300px' onClick={fetchKnownFor} />

                    }
                </section>
            </div>
        </div>
    </section>
  )
}

export default Person;