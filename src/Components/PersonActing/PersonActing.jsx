import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

import "./PersonActing.scss";
import { useEffect, useState } from 'react';
import fetchData from '../../Utilities/fetchData';
import StarIcon from '@mui/icons-material/Star';
import fitLongString from '../../Utilities/fitLongString';
// import { KingBed } from '@mui/icons-material';

const PersonActing = ({knownFor}) => {

    const [mediaData,setMediaData] = useState({});
    const [mediaCardIndex,setMediaCardIndex] = useState(0);
    const [isMediaOpen,setIsMediaOpen] = useState(false);

    console.log(knownFor);

    const fetchMedia = (mediaType,id,i)=> {
        setIsMediaOpen(true);
        setMediaData({});
        setMediaCardIndex(i)

        fetchData(`${mediaType}/${id}?language=en-US`)
        .then((data)=> {
            setMediaData(data);
            console.log(data);
        })

    };

    const MediaCard = ({mediaType,id})=> {
        return (
            <div className="media-card media">
                <div className="media-container media">
                    <Link to={`/${mediaType}/${id}`} className="image-box media">
                        <img 
                            className='media'
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
                                    {fitLongString(mediaData?.title,30)}
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
            </div>
        )
    };

    useEffect(()=>{
        if(isMediaOpen === true){
            const handleClick = (e)=> {
                if(!e.target.classList.contains('media')){
                    
                    setIsMediaOpen(false);
                }
            };
            const root = document.getElementById('root');
            
            root.addEventListener('click',handleClick);
            
            return ()=> root.removeEventListener('click',handleClick)
        };
    },[]);


  return (
    <section className="pers-acting">
        <header className="pers-acting-head">
            <h4>Acting</h4>
            <nav className='acting-nav'>
                <ul className='acting-ul'>
                    <li> all <ArrowDropDownIcon /></li>
                    <li> department <ArrowDropDownIcon /></li>
                </ul>
            </nav>
        </header>
        <table className="credits-tabel">
            <tbody className='credits-tabel-body'>
                {
                    knownFor?.cast?.map((movie,i)=>(
    
                        <tr key={movie?.id} className="part">
                            <td className='year'>
                                {new Date(movie?.release_date)?.getFullYear()  || new Date(movie?.first_air_date)?.getFullYear() || '___'}
                            </td>
                            <td className='cercle media'>
                                <span className='media' onClick={()=> fetchMedia(movie?.media_type,movie?.id,i)} ></span>
                                {
                                    isMediaOpen && i === mediaCardIndex ? 
                                    <MediaCard mediaType={movie?.media_type} id={movie?.id}/> :''
                                }
                            </td>
                            <td className='movie-title'> 
                                <tr>
                                    <Link to={`/${movie?.media_type}/${movie?.id}`}>
                                        { movie?.title || movie?.name}
                                    </Link>
                                </tr> 
                                <tr>
                                     <span>as {movie?.character}</span>
                                </tr>  
                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    </section>
  )
}

export default PersonActing