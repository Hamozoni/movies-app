import { useContext, useState } from 'react';

import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import "./EpisodeCard.scss";

import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import imageURL from '../../../assets/smooth-gray-background-with-high-quality_53876-124606.avif'
import EpisodeInfo from './EpisodeInfo';


const EpisodeCard = ({episode}) => {
    
    const {lang,theme} = useContext(globalContext);
    const [episodeIndex,setEpisodeIndex] = useState(null);

  return (
    <div className="episode-card card" id={episode.episode_number}>
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
                    <h4 className={`t-color-${theme} name`}>
                        {episode?.episode_number}
                    </h4>
                    <div className="t-content">
                        <h4 className={`t-color-${theme} name`}>
                            {episode?.name}
                        </h4>
                        <div className="rating-year">
                            <div className="rating">
                                <StarIcon />
                                <span>{episode?.vote_average?.toFixed(1)}</span>
                            </div>
                            <p className={`t-color-${theme}-3 year`}>
                                {episode?.air_date}  {episode?.runtime}m
                            </p>
                        </div>
                    </div>

                </div>
                <p className={`t-color-${theme}-2 overview`}>
                    {episode?.overview || "We don't have an overview translated in English. Help us expand our database by adding one."}
                </p>
            </div>
        </div>
        <div className="more-ep-info">
            {
                episode?.episode_number === episodeIndex ?
                    <EpisodeInfo episode={episode} /> 
                : 
                <div className="expand">
                    <a
                        className='exp-link link-color'
                        href={`#${episode?.episode_number}`}
                        onClick={()=> setEpisodeIndex(episode.episode_number)}
                        >
                       <KeyboardArrowDownIcon /> {lang === 'en' ? 'Expand' : 'توسيع'}
                    </a>
                </div>
            }
        </div>
    </div>
  )
}

export default EpisodeCard;

