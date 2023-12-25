import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./MovieCard.scss";

const MovieCard = ({movie, type})=> {

    return (
        <div className="movie-card">
            <div className="image-container">
                 <img 
                    className='poster'
                    src={process.env.REACT_APP_BASE_URL + 'w200' + movie?.poster_path} 
                    alt={movie?.title}
                     />
                 <div class="consensus">
                    <h3>
                        {movie?.vote_average.toFixed(1).toString().replace('.','')}*
                    </h3>
                 </div>
                 <span className="more-btn">
                      <MoreHorizIcon />
                 </span>
            </div>
            <div className="content">
                <h3 className="title">
                    {type === 'movie' ? movie?.title : movie?.name}
                </h3>
                {
                    type === 'movie' && 
                    <span className="time">
                        {movie?.release_date}
                    </span>
                }
            </div>
        </div>
    );
};

export default MovieCard;