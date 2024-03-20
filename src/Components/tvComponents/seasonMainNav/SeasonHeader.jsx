import { useContext } from "react"
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext"
import { Link, useParams } from "react-router-dom";

import WestIcon from '@mui/icons-material/West';

import "../../sharedComponents/mediaHeader/mediaHeader.scss";
const SeasonHeader = ({details,isEpisode = false}) => {

    const {color} = useContext(mediaColorContext);
    const {id,seasonNumber,episodeNumber} = useParams();

    const imageUrl = process.env.REACT_APP_BASE_URL + 'w200' + (details?.poster_path || details?.still_path) 

  return (
    <header 
        className="main-t-header" 
        style={{backgroundColor: color.backColor}}>
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={imageUrl}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3
                        style={{color:color.textColor}}
                        className="name"
                         >  
                            {
                                isEpisode && <span>{`${seasonNumber}×${episodeNumber} `}</span>
                            }
                            {`${details?.name} (${new Date(details?.air_date)?.getFullYear()})`}
                    </h3>
                    <Link 
                        style={{color:color.textColor}}
                        to={`/tv/${id}/${isEpisode ? `season/${seasonNumber}` : 'seasons'}`} 
                        className="back-to"> 
                        <WestIcon />{`back to ${isEpisode ? 'episode' : 'seasons list'}`}
                    </Link>
                </div>
            </div>
    </header>
  )
}

export default SeasonHeader