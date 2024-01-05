
import { useContext, useEffect, useState } from "react";
import "./SeasonEpisodes.scss";
import { Link, useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import WestIcon from '@mui/icons-material/West';

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
            <header className="episode-header">
                <div className="epi-image">
                    <img 
                        loading="lazy"
                        src="" 
                        alt="" 
                        />
                </div>
                <div className="sea-titles">
                    <h4 className="name">

                    </h4>
                    <Link >
                       <WestIcon />
                        back to season list
                    </Link>
                </div>
            </header>
            <div className="back-forword">
                <Link></Link>
                <Link></Link>
            </div>
            <div className="episodes">
                {
                    
                }
            </div>

        </div>
    </main>
  )
}

export default SeasonEpisodes