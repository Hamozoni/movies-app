import StarIcon from '@mui/icons-material/Star';
import "./EpisodeCard.scss";

import imageURL from '../../../Images/smooth-gray-background-with-high-quality_53876-124606.avif'


const EpisodeCard = ({episode}) => {

  return (
    <div className="episode-card card">
        <div className="card">
            <div className="epis-image">
                <img 
                    className='image-hover'
                    loading="lazy"
                    src={episode.still_path ? process.env.REACT_APP_BASE_URL + 'w200' + episode?.still_path : imageURL}
                    alt="" 
                    />
            </div>
            <div className="epis-details">
                <div className="titles">
                    <h4 className="name">
                        {episode?.episode_number}
                    </h4>
                    <div className="t-content">
                        <h4 className="name">
                            {episode?.name}
                        </h4>
                        <div className="rating-year">
                            <div className="rating">
                                <StarIcon />
                                <span>{episode?.vote_average?.toFixed(1)}</span>
                            </div>
                            <p className="year">
                            {episode?.air_date}  {episode?.runtime}m
                            </p>
                        </div>
                    </div>

                </div>
                <p className='overview'>{episode?.overview}</p>
            </div>
        </div>

    </div>
  )
}

export default EpisodeCard;

