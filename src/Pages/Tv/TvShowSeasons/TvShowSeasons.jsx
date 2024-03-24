import { useContext} from "react";
import {  useParams } from "react-router-dom"
import "./TvShowSeasons.scss";
import TvSeasonCard from "../../../Components/tvComponents/tvSeasonCard/TvSeasonCard";
import { tvShowDetailsContext } from "../../../Layouts/tvShowsLayout/TvShowsLayout";


const TvShowSeasons = () => {

    const {id} = useParams();
    const {details} = useContext(tvShowDetailsContext);

  return (
    <main className="tv-seasons">
        <div className="tv-s-container">
            <div className="tv-seasons-content">
                {
                 details?.seasons?.map((tvShow)=>(
                    <TvSeasonCard key={tvShow?.id} tvShow={tvShow} id={id}/>
                 ))
                }
            </div>

        </div>
    </main>
  )
}

export default TvShowSeasons