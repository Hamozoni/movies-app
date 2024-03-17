
import { useNavigate } from "react-router-dom";
import "./TvSeasonCard.scss";

import StarIcon from '@mui/icons-material/Star';

import imageUrl from "../../../Images/smooth-gray-background-with-high-quality_53876-124606.avif"

const TvSeasonCard = ({tvShow,id}) => {

    const navigate = useNavigate();

    console.log(tvShow)

  return (
    <div className="season-card card">
        <div 
            onClick={()=> navigate(`/tv/${id}/season/${tvShow?.season_number}`)}
            className="season-image image-hover"
            >
            <img 
                loading="lazy" 
                src={tvShow.poster_path ? process.env.REACT_APP_BASE_URL + 'w200' + tvShow?.poster_path : imageUrl}
                alt="" 
                />
        </div>
        <div className="season-details">
            <div className="s-titles">
                <h3 className="s-name"  onClick={()=> navigate(`/tv/${id}/season/${tvShow?.season_number}`)}>
                    {tvShow?.name}
                </h3>
                <div className="rating-year">
                    {
                        tvShow?.vote_average > 0 &&
                        <div className="rating">
                        <StarIcon />
                            <span>{tvShow?.vote_average?.toFixed(1)}</span>
                        </div>
                    }
                    <p className="year">
                        {new Date(tvShow?.air_date)?.getFullYear()}.{tvShow?.episode_count} episodes
                    </p>

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