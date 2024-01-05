
import { useNavigate } from "react-router-dom";
import "./TvSeasonCard.scss";

const TvSeasonCard = ({tvShow,id}) => {

    const navigate = useNavigate()

  return (
    <div className="season-card">
        <div 
            onClick={()=> navigate(`/tv/${id}/season/${tvShow?.season_number}`)}
            className="season-image"
            >
            <img 
                loading="lazy" 
                src={process.env.REACT_APP_BASE_URL + 'w200' + tvShow?.poster_path}
                alt="" 
                />
        </div>
        <div className="season-details">
            <div className="s-titles">
                <h3 className="s-name">
                    {tvShow?.name}
                </h3>
                <div className="rating-year">
                    <span className="rating">
                        {tvShow?.vote_average}
                    </span>
                    <span className="year">
                        {new Date(tvShow?.air_date)?.getFullYear()}.
                    </span>
                    <span>
                        {tvShow?.episode_count} episodes
                    </span>

                </div>

            </div>
            <div className="s-overview">
                <p className="date">
                    {`${tvShow?.name} of ${tvShow?.name}  premiered on ${tvShow?.air_date}`}
                </p>
                <aside className="overview">
                    {tvShow?.overview}
                </aside>

            </div>
        </div>
    </div>
  )
}

export default TvSeasonCard