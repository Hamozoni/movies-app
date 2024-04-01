import { useContext } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./MovieCard.scss";
import { useNavigate } from 'react-router-dom';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

import mediaImage from "../../../assets/media.jpg"

const MovieCard = ({movie, type})=> {

    const navigate = useNavigate();
    const {theme} = useContext(globalContext);

    const imgUrl =  movie?.poster_path ;

    const handleNavigation = ()=> {
        navigate(`/${type}/${movie?.id}`);
    }

    return (
        <div className="movie-card scale">
            <div className="image-container"> 
                 <img 
                    loading="lazy"
                    onClick={handleNavigation}
                    className='poster image-hover '
                    src={imgUrl ? process.env.REACT_APP_BASE_URL + 'w200' + imgUrl : mediaImage} 
                    alt={movie?.title}
                     />
                <div class="consensus">
                    <h3>
                        {movie?.vote_average?.toFixed(1)?.toString()?.replace('.','')}*
                    </h3>
                </div>
                <span className="more-btn">
                    <MoreHorizIcon />
                </span>
            </div>
            <div className="content">
                <h3 
                   className={`title link-hover t-color-${theme}`} 
                   onClick={handleNavigation}
                   >
                    {movie?.title || movie?.name}
                </h3>
                <span className={`time t-color-${theme}-3`}>
                    {movie?.release_date ?? movie?.first_air_date}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;