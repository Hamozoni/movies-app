import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData"
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./Keyword.scss";

export const MovieCard = ({movie})=> {
  return (
    <div className="key-card">
        <Link 
            to={movie?.title ? `/movie/${movie?.id}` : `/tv/${movie?.id}`} 
            className="key-image">
            <img 
                loading="lazy"
                src={process.env.REACT_APP_BASE_URL + 'w200' + movie?.poster_path}
                alt="" 
              />
        </Link>
      <div className="card-details">
          <div className="key-title">
              <Link 
                  className="name" 
                  to={movie?.title ? `/movie/${movie?.id}` : `/tv/${movie?.id}`} 
                  >
                  {movie?.title || movie?.name}
              </Link>
              <p className="date-re">
                  {movie?.release_date || movie?.first_air_date}
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

const Keywords = () => {

  const {id} = useParams();
  const {lang} = useContext(globalContext);

  const [Keywords,setKeywords] = useState()

  useEffect(()=>{
    fetchData(`keyword/${id}/movies?include_adult=false&language=${lang}&page=1`)
    .then((data)=>{
      setKeywords(data);
      console.log(data);
    })
  },[id,lang]);


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