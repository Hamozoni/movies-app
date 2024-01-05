import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";
import TvSeasonCard from "../../Components/TvSeasonCard/TvSeasonCard";

import WestIcon from '@mui/icons-material/West';

import "./TvShowSeasons.scss";

const TvShowSeasons = () => {

    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [seasons,setSeasons] = useState();


    useEffect(()=>{
       

        fetchData(`tv/${id}?language=${lang}`)
        .then((data)=>{
            setSeasons(data);
            console.log(data)
        })

    },[id,lang]);


  return (
    <main className="tv-seasons">
        <div className="tv-s-container">
            <header className="seasons-header">
                <div className="tv-details">
                    <div className="tv-image">
                        <img 
                            loading="lazy"
                            src={process.env.REACT_APP_BASE_URL + 'w200' + seasons?.poster_path}
                            alt="" 
                            />

                    </div>
                    <div className="tv-name">
                        <h3 className="name">
                            {`${seasons?.name} (${new Date(seasons?.first_air_date)?.getFullYear()})`}
                        </h3>
                        <Link> <WestIcon /> back to main</Link>
                    </div>
                </div>
            </header>
            <div className="tv-seasons-content">
                {
                 seasons?.seasons?.map((tvShow)=>(
                    <TvSeasonCard key={tvShow?.id} tvShow={tvShow} id={id}/>
                 ))
                }
            </div>

        </div>
    </main>
  )
}

export default TvShowSeasons