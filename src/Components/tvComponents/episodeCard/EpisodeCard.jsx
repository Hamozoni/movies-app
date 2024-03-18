import StarIcon from '@mui/icons-material/Star';
import "./EpisodeCard.scss";

import imageURL from '../../../Images/smooth-gray-background-with-high-quality_53876-124606.avif'
import { Link } from 'react-router-dom';


const EpisodeCard = ({episode}) => {

    console.log(episode)

  return (
    <div className="episode-card card">
        <div className="card-container">
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
                <p className='overview'>{episode?.overview || "We don't have an overview translated in English. Help us expand our database by adding one."}</p>
            </div>
        </div>
        <div className="epis-more-info">
            <nav className="epis-nav">
                <ul className="epis-nav-ul">
                    <li>videos</li>
                    <li>images</li>
                    <li>changes</li>
                    <li>report</li>
                    <li>edit</li>
                </ul>
            </nav>
            <div className="epis-crew-guest">
                <section className='ep-crew'>
                    <h4>crew</h4>
                    <div className="ep-crew-box">

                    </div>
                </section>
                <section className='ep-guest'>
                    <nav className="ep-g-nav">
                        <h4>guest starts</h4>
                        <Link>full cast&crew</Link>
                    </nav>
                    <div className="ep-guest-box">

                    </div>
                </section>
            </div>
            <section className="epis-images">
                <nav className="ep-img-nav">
                    <h4 className="ep-img-t">episode images</h4>
                    <Link >view all episode images</Link>
                </nav>
                <div className="ep-images-box">
                    
                </div>
            </section>
        </div>
    </div>
  )
}

export default EpisodeCard;

