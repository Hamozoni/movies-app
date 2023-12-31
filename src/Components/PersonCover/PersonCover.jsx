import { useContext, useEffect, useState } from "react";
import "./PersonCover.scss";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import MovieCard from "../MovieCard/MovieCard";


const PersonCover = ({details,id}) => {

    const {lang} = useContext(globalContext);
    const [knownFor,setKnownFor] = useState([]);

    useEffect(()=>{
        fetchData(`person/${id}/combined_credits?language=${lang}`)
        .then(data=> {
            console.log(data);
            setKnownFor(data);
        })
    },[id]);

  return (
    <section className="person-cover">
        <div className="per-cover-container">
            <div className="person-img">
                <img src={process.env.REACT_APP_BASE_URL + 'original' + details?.profile_path} alt={details?.name} />
            </div>
            <div className="person-cov-conrent">
                <div className="person-name">
                    <h3>{details?.name}</h3>
                </div>
                <div className="piagrahpy">
                    <h4 className="pi-ti">
                         Biography
                     </h4>
                    <aside> {details?.biography} </aside>
                </div>
                <section className="known-for">
                    <h4 className="kn-for">
                        Known For
                    </h4>
                    <div className="kn-for-container">
                        {
                            knownFor?.cast?.map((movie)=>(
                                <MovieCard movie={movie}  type='movie'/>
                            ))
                        }
                    </div>

                </section>
            </div>
        </div>
    </section>
  )
}

export default PersonCover;