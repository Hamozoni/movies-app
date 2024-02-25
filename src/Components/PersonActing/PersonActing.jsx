import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

import "./PersonActing.scss";
import { useEffect, useState } from 'react';
import fetchData from '../../Utilities/fetchData';
import StarIcon from '@mui/icons-material/Star';
// import { KingBed } from '@mui/icons-material';

const PersonActing = ({knownFor}) => {

    const [mediaData,setMediaData] = useState({});
    const [mediaCardIndex,setMediaCardIndex] = useState(0);
    const [isMediaOpen,setIsMediaOpen] = useState(false);

    console.log(knownFor);

    const fetchMedia = (mediaType,id,i)=> {
        setIsMediaOpen(true);
        setMediaData({})
        setMediaCardIndex(i)

        fetchData(`${mediaType}/${id}?language=en-US`)
        .then((data)=> {
            setMediaData(data);
            console.log(data);
        })

    };

    const MediaCard = ()=> {
        return (
            <div className="media-card media">
                <div className="media-container media">
                    <div className="image-box media">
                        <img 
                            className='media'
                            loading='lazy' 
                            src={process.env.REACT_APP_BASE_URL + 'original' + mediaData?.poster_path}
                            alt={mediaData?.title}
                            />
                    </div>
                    <div className="media-details media">
                        <nav className='media'>
                            <h4 className="name media">{mediaData?.title}</h4>
                            <span className='media'>
                                <StarIcon className='media' />
                                {mediaData?.vote_average}
                            </span>
                        </nav>
                        <p className='media'>{mediaData?.overview}</p>
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
                                    <MediaCard /> :''
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