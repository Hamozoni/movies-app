import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
const MovieCard = ({movie})=> {

    return (
        <div className="movie-card">
            <div className="image-container">
                 <img src={process.env.REACT_APP_BASE_URL + 'w200' + movie?.poster_path} alt={movie?.title} />
                 <div class="consensus">
                    <h3>
                        {movie?.vote_average.toFixed(1).toString().replace('.','')}*
                    </h3>
                 </div>
                 <span className="more-btn">
                      <MoreVertOutlinedIcon />
                 </span>
            </div>
            <div className="content">
                <h3 className="title">
                    {movie?.title}
                </h3>
                <span className="">
                    {movie?.release_date}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;