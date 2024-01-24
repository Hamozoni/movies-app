
import { useContext, useEffect, useState } from "react";
import "./SeasonEpisodes.scss";
import { Link, useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import WestIcon from '@mui/icons-material/West';
import EpisodeCard from "../../Components/EpisodeCard/EpisodeCard";
import "./SeasonEpisodes.scss";

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
            <header className="main-t-header">
                <div className="media-details">
                    <div className="media-image">
                        <img 
                            loading="lazy"
                            src={process.env.REACT_APP_BASE_URL + 'w200' + episodes?.poster_path } 
                            alt="" 
                            />
                    </div>
                    <div className="media-name">
                        <h4 className="name">
                        {`${episodes?.name}(${new Date(episodes?.air_date)?.getFullYear() })`}
                        </h4>
                        <Link to={`/tv/${id}/seasons`} className="media-back-to">
                            <WestIcon />
                            back to season list
                        </Link>
                    </div>
                </div>
            </header>
            <div className="back-forword">
                <Link></Link>
                <Link></Link>
            </div>
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