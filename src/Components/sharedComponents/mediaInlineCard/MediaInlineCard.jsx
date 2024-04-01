
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './mediaCard.scss';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const MediaInlineCard = ({movie, type})=> {

  const {theme} = useContext(globalContext)
    return (
      <div className="key-card card">
          <Link 
              to={`/${type}/${movie?.id}`} 
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
               <h5>
                  <Link 
                      className={`link-hover name t-color-${theme}`}
                      to={`/${type}/${movie?.id}`} 
                      >
                      {movie?.title || movie?.name}
                  </Link>
               </h5>
                <p className={`date-re t-color-${theme}-3`}>
                    {movie?.release_date || movie?.first_air_date}
                </p>
            </div>
            <div className="key-overview">
                <p className={`t-color-${theme}-2`}>
                  {movie?.overview}
                </p>
  
            </div>
        </div>
      </div>
    )
  }

  export default MediaInlineCard;