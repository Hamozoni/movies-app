import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom"




import "./TvShowSeasons.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import TvSeasonCard from "../../../Components/tvComponents/tvSeasonCard/TvSeasonCard";


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