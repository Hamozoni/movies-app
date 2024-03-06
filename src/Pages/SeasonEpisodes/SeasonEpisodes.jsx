
import { useContext, useEffect, useState } from "react";
import "./SeasonEpisodes.scss";
import { useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import EpisodeCard from "../../Components/EpisodeCard/EpisodeCard";
import "./SeasonEpisodes.scss";
import MediaHeader from "../../Components/mediaHeader/MediaHeader";

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