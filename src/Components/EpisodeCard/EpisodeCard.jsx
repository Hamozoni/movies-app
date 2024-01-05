import StarIcon from '@mui/icons-material/Star';
const EpisodeCard = ({episode}) => {
  return (
    <div className="episode-card">
        <div className="card">
            <div className="epis-image">
                <img 
                    loading="lazy"
                    src={process.env.REACT_APP_BASE_URL + 'w200' + episode?.still_path}
                    alt="" 
                    />
            </div>
            <div className="epis-details">
                <div className="titles">
                    <h4 className="num">
                        {episode?.episode_number}
                    </h4>
                    <div className="name">
                        <h4 className="name">
                            {episode?.name}
                        </h4>
                        <span className="rating">
                            <StarIcon />
                            {episode?.vote_average}
                        </span>
                        <span className="date">
                            {episode?.air_date}
                        </span>
                        <span className="runtime">
                            {episode?.runtime}m
                        </span>
                    </div>

                </div>
                <p>{episode?.overview}</p>
            </div>
        </div>

    </div>
  )
}

export default EpisodeCard