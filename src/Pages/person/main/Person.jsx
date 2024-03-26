import "./person.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { personDetailsContext } from "../../../Layouts/personLayout/PersonLayout";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import PersonStitistics from "../../../Components/personComponents/PersonStitistics/PersonStitistics";
import MovieCard from "../../../Components/movieComponents/movieCard/MovieCard";
import fitLongString from "../../../utilities/fitLongString";
import PersonActing from "../../../Components/personComponents/PersonActing/PersonActing";


const Person = () => {

    const {id} = useParams();
    const { details} = useContext(personDetailsContext);

    const {lang,innerWidth} = useContext(globalContext);
    const [knownFor,setKnownFor] = useState([]);

    useEffect(()=>{
        fetchData(`person/${id}/combined_credits?language=${lang}`)
        .then(data=> {
            console.log(details);
            setKnownFor(data);
        })
    },[id,lang]);

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
                            innerWidth < 630 && <h3 className="person-name">{details?.name}</h3>
                        }
                </div>
                <PersonStitistics details={details}/>
            </div>
            <div className="person-cov-content">
                <div className="person-name">
                    { 
                        innerWidth > 629 && <h3>{details?.name}</h3>
                    }
                </div>
                <div className="piagrahpy">
                    <h4 className="pi-ti">
                         Biography
                     </h4>
                    <aside> {fitLongString(details?.biography,1000) } </aside>
                </div>
                <section className="known-for">
                    <h4 className="pi-ti">
                        Known For
                    </h4>
                    <div className="kn-for-container">
                        {
                            knownFor?.cast?.map((movie,i)=>(
                                i < 6 &&
                                <MovieCard movie={movie}  type='movie'/>
                            ))
                        }
                    </div>
                    <PersonActing knownFor={knownFor} />
                </section>
            </div>
        </div>
    </section>
  )
}

export default Person;