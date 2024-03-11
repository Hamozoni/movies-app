import { useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import { Link } from "react-router-dom";

import WestIcon from '@mui/icons-material/West';

import "./mediaHeader.scss";

const MediaHeader = ({mediaType,id}) => {

    const [details,setDetails] = useState({})

    useEffect(()=>{
        fetchData(`${mediaType}/${id}?language=en-US`)
        .then((data)=> {
            setDetails(data);
            console.log(data)
        })
    },{id});

  return (
        <header className="main-t-header">
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'w200' + details?.poster_path}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3 className="name">
                        {
                            mediaType === 'tv' ? 
                            (
                                `${details?.name} (${new Date(details?.first_air_date)?.getFullYear()})`
                            )
                            : 
                            (
                                `${details?.title} (${new Date(details?.release_date)?.getFullYear()})`
                            )
                        }
                    </h3>
                    <Link to={`/${mediaType}/${id}`} className="back-to"> 
                        <WestIcon /> back to main
                    </Link>
                </div>
            </div>
        </header>
  )
}

export default MediaHeader