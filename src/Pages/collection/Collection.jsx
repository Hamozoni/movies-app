import { useParams } from "react-router-dom"
import MovieTvCover from "../../Components/movieComponents/movieTvCover/MovieTvCover"
import { useContext, useEffect, useState } from "react";
import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";
import MediaInlineCard from "../../Components/sharedComponents/mediaInlineCard/MediaInlineCard";

import "./collection.scss";

const Collection = () => {

    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDetails = ()=> {

        setIsPending(true);
        setError(null);

        fetchData(`collection/${id}?language=${lang}`)
        .then((data)=> {
            setDetails(data);
            console.log(data)
        })
        .catch(error=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false)
        });
    }

    useEffect(fetchDetails,[id,lang]);

  return (
    <div className="collection-main">
        {
            isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> 
            : details ?
            <div className="coll-container">
                <MovieTvCover details={details} mediaType='collection' />
                <div className="collection-movie">
                     <header className="coll-header">
                        <h4>{details?.parts?.length} movies </h4>
                     </header>
                     <div className="coll-movie-box">
                        {
                           details?.parts?.map((movie)=> (
                             <MediaInlineCard movie={movie} type={movie?.media_type}/>
                           )) 
                        }
                     </div>
                </div>
            </div>
            : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDetails} />
        }
    </div>
  )
}

export default Collection