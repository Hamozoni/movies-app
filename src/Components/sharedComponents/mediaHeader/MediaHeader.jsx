import { useContext } from "react"
import { Link} from "react-router-dom";

import WestIcon from '@mui/icons-material/West';

import "./mediaHeader.scss";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";

const MediaHeader = ({imageUrl,title,navigateTo,linkTitle,year=null}) => {

    const {color} = useContext(mediaColorContext);

  return (

    <header 
        className="main-t-header" 
        style={{backgroundColor: color.backColor}}>
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'w200' + imageUrl}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3
                        style={{color:color.textColor}}
                         className="name" 
                         >
                            { title}{year ? `(${new Date(year)?.getFullYear()})` : ''}
                    </h3>
                    <Link 
                        style={{color:color.textColor}}
                        to={navigateTo} 
                        className="back-to"> 
                        <WestIcon /> {linkTitle}
                    </Link>
                </div>
            </div>
    </header>
    )
}

export default MediaHeader;
