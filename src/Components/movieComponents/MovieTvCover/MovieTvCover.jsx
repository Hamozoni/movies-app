
import "./MovieTvCover.scss";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { languages } from "../../../utilities/languages";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MovieTvCover = ({details,mediaType})=> {

    const {lang,setIsTrailer,setMediaType,setMediaId} = useContext(globalContext);
    const [crews,setCrews] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const imageUrl = process.env.REACT_APP_BASE_URL + 'original'  + details?.backdrop_path;
    const linearGrad = 'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)';

    const fetch = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${details?.id}/credits?language=${lang}`)
        .then((data)=>{
            setCrews(data?.crew);
            setIsPending(false);
            console.log(details)
        })
        .catch(error=> {
            setIsPending(false);
            setError(error);
            console.log(error)
        });
    }
    useEffect(fetch,[details?.id]);

    const getMovieRuntime = (time)=>{
        const runTime = (time / 60)?.toString()?.split('.');
        return `${runTime[0]}h ${time % 60}m`
        
    }


    return (
        <section 
            className="cover" 
            style={{backgroundImage: `${linearGrad},url(${imageUrl})`}}
            >
                <div className="cover-container">
                    <div className="cover-image">
                        <img 
                            className="image-hover"
                            loading="lazy"
                            src={process.env.REACT_APP_BASE_URL + 'w300' + details?.poster_path} 
                            alt="" 
                            />
                    </div>
                    <div className="cover-content">
                        <div className="titles">
                            <h3 className="name">
                                {details?.title || details?.name + `(${new Date(details?.release_date  || details?.first_air_date)?.getFullYear()})`}
                            </h3>
                            <div className="details">
                                <span>
                                    {details?.release_date && details?.release_date + `(${details?.original_language}) . `}
                                </span>
                                    {details?.genres?.map((genre)=>(
                                        <span>
                                            {genre?.name},  
                                        </span>
                                    ))}
                                    <span>{getMovieRuntime(details?.runtime)}</span>
                            </div>

                        </div>
                        <div className="links flex-box">
                            <div className="user-score-container">
                                <div className="user-score flex-box">
                                    <h4>
                                        {details?.vote_average?.toFixed(1)?.toString()?.replace('.','')}
                                        <span>%</span>
                                    </h4>
                                </div>
                                <h3>user score</h3>

                            </div>
                            <nav className="add-to flex-box">
                                <ul className="flex-box">
                                    <li className="flex-box">
                                        <PlaylistAddIcon />
                                    </li>
                                    <li className="flex-box">
                                        <FavoriteIcon />
                                    </li>
                                    <li className="flex-box">
                                        <TheatersIcon />
                                    </li>
                                    <li className="flex-box">
                                        <StarIcon />
                                    </li>
                                </ul>
                            </nav>
                            <div className="play-trailer flex-box">
                                <PlayArrowIcon />
                                <button onClick={()=> {
                                    setMediaId(details?.id);
                                    setMediaType(details?.title ? 'movie' : 'tv');
                                    setIsTrailer(true);
                                }}>
                                    {languages[lang]?.playTrailer}
                                </button>
                            </div>

                        </div>
                        <div className="overview">
                            <p>{details?.tagline}</p>
                            <h5>{languages[lang]?.overview}</h5>
                            <aside>
                                {details?.overview}
                            </aside>
                        </div>
                        <div className="crews flex-box">
                            {
                            isPending ? <Loading width='100%'  height='80px' /> 
                            : crews?.length ? 
                                crews?.map((crew,i)=>(
                                    i < 4 &&
                                    <div key={crew?.id} className="crew">
                                        <Link to={`/person/${crew?.id}`}>{crew?.name}</Link>
                                        <aside>{crew?.job}</aside>
                                    </div>
                                ))
                               :  error &&  <Error error={error} height='80px'  onClick={fetch}/> 
                            }
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default MovieTvCover;