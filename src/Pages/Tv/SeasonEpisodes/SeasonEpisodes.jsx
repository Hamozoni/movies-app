
import { useContext, useEffect, useState } from "react";
import "./SeasonEpisodes.scss";
import { useParams } from "react-router-dom";


import "./SeasonEpisodes.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import EpisodeCard from "../../../Components/tvComponents/episodeCard/EpisodeCard";
import fetchData from "../../../utilities/fetchData";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";


const SeasonEpisodes = () => {

    const {seasonNumber} = useParams();
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [episodes,setEpisodes] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const [error,setError] = useState(null);

    const fetchEpisodes = ()=>{
        setIsPending(true);
        fetchData(`tv/${id}/season/${seasonNumber}?language=${lang}`)
        .then((data)=> {
            setEpisodes(data);
            setIsPending(false);
            console.log(data);
        })
        .catch(error=> {
            setError(error)
            setIsPending(false);
        })

    }

    useEffect(fetchEpisodes,[id,seasonNumber]);

    if(isPending) {
        return (
            <Loading width='100%' height='100vh' />
        )
    }

    if(error) {
        return (
            <Error error={error}  height='100vh' onClick={fetchEpisodes}/>
        )
    }

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