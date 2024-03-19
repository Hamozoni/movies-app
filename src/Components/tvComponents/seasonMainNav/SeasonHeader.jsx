import { useContext } from "react"
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext"
import { Link, useParams } from "react-router-dom";

import WestIcon from '@mui/icons-material/West';

import "../../sharedComponents/mediaHeader/mediaHeader.scss";
const SeasonHeader = ({details}) => {

    const {color} = useContext(mediaColorContext);
    const {id} = useParams();
  return (
    <header 
        className="main-t-header" 
        style={{backgroundColor: color.backColor}}>
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'w200' + details?.poster_path}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3
                        style={{color:color.textColor}}
                        className="name" >
                            {
                              `${details?.name} (${new Date(details?.air_date)?.getFullYear()})`
                            }
                    </h3>
                    <Link 
                        style={{color:color.textColor}}
                        to={`/tv/${id}/seasons`} 
                        className="back-to"> 
                        <WestIcon /> back to seasons list
                    </Link>
                </div>
            </div>
    </header>
  )
}

export default SeasonHeader