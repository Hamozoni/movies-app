import { useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import Loading from "../../loading/Loading";
import { Link } from "react-router-dom";
import Error from "../../error/Error";
import StarIcon from '@mui/icons-material/Star';
import fitLongString from "../../../utilities/fitLongString";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';

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
        <div className="media-card open">
            {
                isPending ? <Loading width='100%' height='100%' /> 
                : mediaData ?
                <div className="media-container open">
                    <Link to={`/${mediaType}/${id}`} className="image-box">
                        <img 
                            className='image-hover open'
                            loading='lazy' 
                            src={process.env.REACT_APP_BASE_URL + 'original' + mediaData?.poster_path}
                            alt={mediaData?.title}
                            />
                    </Link>
                    <div className="media-details open">
                        <nav className='act-media'>
                            <Link 
                                to={`/${mediaType}/${id}`} 
                                className="name open"
                                >
                                    {mediaData?.title ? fitLongString(mediaData?.title,30) :fitLongString(mediaData?.name,30)}
                            </Link>
                            <div className='act-vote open'>
                                <StarIcon className="open"  />
                                <p className="open" >
                                    {mediaData?.vote_average?.toFixed(1)}
                                </p>  
                            </div>
                        </nav>
                        <p className='overview open'>{fitLongString(mediaData?.overview,150)}</p>
                        <div className="add-to open">
                            <div className="add scale image-hover open"><FavoriteIcon className="open" /></div>
                            <div className="add scale image-hover open"><BookmarkIcon className="open"  /></div>
                            <div className="add scale image-hover open"> <StarIcon className="open"  /></div>
                        </div>
                    </div>
                </div>
                : error && <Error error={error} height='100%' onClick={fetchMedia}/>
            }
        </div>
    )
}

export default ActingMediaCard;