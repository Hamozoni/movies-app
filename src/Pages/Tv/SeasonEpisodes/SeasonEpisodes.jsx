
import { useContext, useEffect, useState } from "react";
import "./SeasonEpisodes.scss";
import { useParams } from "react-router-dom";


import "./SeasonEpisodes.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import EpisodeCard from "../../../Components/tvComponents/episodeCard/EpisodeCard";
import fetchData from "../../../utilities/fetchData";


const SeasonEpisodes = () => {

    const {seasonNumber} = useParams();
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [episodes,setEpisodes] = useState({});

    useEffect(()=>{
        fetchData(`tv/${id}/season/${seasonNumber}?language=${lang}`)
        .then((data)=> {
            setEpisodes(data);
            console.log(data);
        })

    },[id,seasonNumber]);

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