
import "./MovieTvCover.scss";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { languages } from "../../Utilities/languages";
import { Suspense, useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";

const MovieTvCover = ({details})=> {

    const {lang} = useContext(globalContext);
    const [crews,setCrews] = useState([]);

    const imageUrl = process.env.REACT_APP_BASE_URL + 'original'  + details?.backdrop_path;
    const linearGrad = 'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)'
    
    useEffect(()=>{
        fetchData(`movie/${details?.id}/credits?language=${lang}`)
        .then((data)=>{
            console.log(data.cast);
            let unique = []
            data?.crew?.forEach((p)=>{
                
                  if(unique.some( e => e.id === p.id || e.department === p.department)) {

                } else {
                      unique.push(p)
                   }
            })
            setCrews(unique)
            console.log(unique);
        })
    },[details?.id]);

    const getMovieRuntime = (time)=>{
        const runTime = (time / 60)?.toString()?.split('.');
        return `${runTime[0]}h ${runTime[1]}m`
        
    }


    return (
        <Suspense fallback={<p>loading... </p>} >
            <section 
                className="cover" 
                style={{backgroundImage: `${linearGrad},url(${imageUrl})`}}>
                <div className="cover-container">
                    <div className="cover-image">
                        <img src={process.env.REACT_APP_BASE_URL + 'w300' + details?.poster_path} alt="" />
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
                            <div className="user-score flex-box">
                                <h4>
                                    {details?.vote_average?.toFixed(1)?.toString()?.replace('.','')}
                                </h4>
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
                                <button>
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
                            
                            crews?.map((crew,i)=>(
                                   i < 6 &&
                                    <div key={crew?.id} className="crew">
                                        <h4>{crew?.name}</h4>
                                        <aside>{crew?.job}</aside>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    )
}

export default MovieTvCover;