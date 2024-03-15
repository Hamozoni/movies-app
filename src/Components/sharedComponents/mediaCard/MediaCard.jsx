
import { Link } from 'react-router-dom';
import './mediaCard.scss';
const MediaCard = ({movie})=> {
    return (
      <div className="key-card card">
          <Link 
              to={movie?.title ? `/movie/${movie?.id}` : `/tv/${movie?.id}`} 
              className="key-image">
              <img 
                  className="image-hover"
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

  export default MediaCard;