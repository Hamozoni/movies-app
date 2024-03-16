import { useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import Loading from "../../loading/Loading";
import { Link } from "react-router-dom";
import Error from "../../error/Error";
import StarIcon from '@mui/icons-material/Star';
import fitLongString from "../../../utilities/fitLongString";

import './actingMediaCard.scss';


const ActingMediaCard = ({mediaType,id}) => {

    const [mediaData,setMediaData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);


    const fetchMedia = () => {

        setIsPending(true);
        setError(null);
        setMediaData(null);

        fetchData(`${mediaType}/${id}?language=en-US`)
        .then((data)=> {
            setMediaData(data);
            setIsPending(false);
            console.log(data);
        })
        .catch(error=> {
            setError(error)
            setIsPending(false);
        })

    };

    useEffect(fetchMedia,[mediaType,id])

    return (
        <div className="media-card media">
            {
                isPending ? <Loading width='100%' height='100%' /> 
                : mediaData ?
                <div className="media-container media">
                    <Link to={`/${mediaType}/${id}`} className="image-box media">
                        <img 
                            className='media image-hover'
                            loading='lazy' 
                            src={process.env.REACT_APP_BASE_URL + 'original' + mediaData?.poster_path}
                            alt={mediaData?.title}
                            />
                    </Link>
                    <div className="media-details media">
                        <nav className='media'>
                            <Link 
                                to={`/${mediaType}/${id}`} 
                                className="name media"
                                >
                                    {mediaData?.title ? fitLongString(mediaData?.title,30) :fitLongString(mediaData?.name,30)}
                            </Link>
                            <div className='media vote'>
                                <StarIcon className='media' />
                                <p className='media'>
                                    {mediaData?.vote_average?.toFixed(1)}
                                </p>  
                            </div>
                        </nav>
                        <p className='media overview'>{fitLongString(mediaData?.overview,380)}</p>
                    </div>
                </div>
                : error && <Error error={error} height='100%' onClick={fetchMedia}/>
            }
        </div>
    )
}

export default ActingMediaCard;