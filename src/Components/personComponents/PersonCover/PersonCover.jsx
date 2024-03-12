import { useContext, useEffect, useState } from "react";
import "./PersonCover.scss";

import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import PersonStitistics from "../PersonStitistics/PersonStitistics";
import fitLongString from "../../../utilities/fitLongString";
import MovieCard from "../../movieComponents/movieCard/MovieCard";
import PersonActing from '../PersonActing/PersonActing'



const PersonCover = ({details,id}) => {

    const {lang} = useContext(globalContext);
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
            <div className="person-img">
                <img 
                    className="image-hover"
                    src={process.env.REACT_APP_BASE_URL + 'w300' + details?.profile_path} 
                    alt={details?.name} 
                    />
                    <PersonStitistics details={details}/>
            </div>
            <div className="person-cov-content">
                <div className="person-name">
                    <h3>{details?.name}</h3>
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

export default PersonCover;