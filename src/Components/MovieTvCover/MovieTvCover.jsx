
import "./MovieTvCover.scss";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import StarIcon from '@mui/icons-material/Star';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { languages } from "../../Utilities/languages";
import { useContext } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

const MovieTvCover = ({details})=> {

    const {lang} = useContext(globalContext);

    const imageUrl = process.env.REACT_APP_BASE_URL + 'original'  + details?.backdrop_path;
    const linearGrad = 'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)' 


    return (
        <section 
            className="cover" 
            style={{backgroundImage: `${linearGrad},url(${imageUrl})`}}>
            <div className="cover-container">
                <div className="cover-image">
                    <img src={process.env.REACT_APP_BASE_URL + 'w300' + details?.poster_path} alt="" />
                </div>
                <div className="cover-content">
                    <div className="title">
                        <h3 className="name">
                            {details?.title + `(${new Date(details?.release_date)?.getFullYear()})`}
                        </h3>
                        <div className="details">
                            <span>
                                {details?.release_date + `(${details?.production_companies[0]?.origin_country}) . `}
                            </span>
                                {details?.genres?.map((genre)=>(
                                    <span>
                                         {genre?.name},  
                                    </span>
                                ))}
                        </div>

                    </div>
                    <div className="links">
                        <div className="user-score">
                            <h4>
                                {details?.vote_average?.toFixed(1)?.toString()?.replace('.','')}
                            </h4>
                            <p>
                                user score
                            </p>
                        </div>
                        <nav className="add-to">
                            <ul>
                                <li>
                                    <PlaylistAddIcon />
                                </li>
                                <li>
                                    <FavoriteIcon />
                                </li>
                                <li>
                                    <TheatersIcon />
                                </li>
                                <li>
                                    <StarIcon />
                                </li>
                            </ul>
                        </nav>
                        <div className="play-trailer">
                               <PlayArrowIcon />
                            <button>
                                {/* {languages[lang]?.playTrailer} */}
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
                    <div className="cr"></div>
                </div>
            </div>
        </section>
    );
};

export default MovieTvCover;