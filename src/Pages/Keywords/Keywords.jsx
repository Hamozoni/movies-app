import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData"
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./Keyword.scss";

const Keywords = () => {

  const {id} = useParams();
  const {lang} = useContext(globalContext);

  const [Keywords,setKeywords] = useState()

  useEffect(()=>{
    fetchData(`keyword/${id}/movies?include_adult=false&language=${lang}&page=1`)
    .then((data)=>{
      setKeywords(data);
    })
  },[id,lang]);

  const MovieCard = ({movie})=> {
    return (
      <div className="key-card">
          <div className="key-image">
              <img 
                  loading="lazy"
                  src={process.env.REACT_APP_BASE_URL + 'w200' + movie?.poster_path}
                  alt="" 
                />
          </div>
        <div className="card-details">
            <div className="key-title">
                <Link  className="name" to={`/movie/${movie?.id}`} >
                    {movie?.title}
                </Link>
                <p className="date-re">
                    {movie?.release_date}
                </p>
            </div>
            <div className="key-overview">
                <p>
                  {movie?.overview}
                </p>

            </div>
        </div>
      </div>
    )
  }


  return (
     <main className="keywords-page">
        <div className="keywords-container">
          <div className="key-content">
             {
              Keywords?.results?.map((movie)=> (
                <MovieCard key={movie?.id} movie={movie} />
              ))
             }

          </div>
        </div>
     </main>
  )
}

export default Keywords;