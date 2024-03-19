
import "./SeasonEpisodes.scss";

import EpisodeCard from "../../../Components/tvComponents/episodeCard/EpisodeCard";
import { useContext } from "react";
import { episodesContext } from "../../../Layouts/tvShowSeason/TvShowSeason";

const SeasonEpisodes = () => {

    const {episodes} = useContext(episodesContext);


  return (
    <main className="season-episode">
        <div className="sea-episode">
            <div className="episodes">
                {
                    episodes?.episodes?.map((episode)=>(
                        <EpisodeCard  key={episode?.id} episode={episode}/>
                    ))

                }
            </div>

        </div>
    </main>
  )
}

export default SeasonEpisodes