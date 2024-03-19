import { Outlet, useParams } from "react-router-dom"
import SeasonMainNav from "../../Components/tvComponents/seasonMainNav/SeasonMainNav"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"
import { createContext, useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";
import SeasonHeader from "../../Components/tvComponents/seasonMainNav/SeasonHeader";

export const episodesContext = createContext()

const TvShowSeasonLayout = () => {

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
    <div className="TvShows-layout">
        <MediaColorContext>
            <episodesContext.Provider value={{episodes}}>
                <SeasonMainNav />
                <SeasonHeader details={episodes} />
                <Outlet />
            </episodesContext.Provider>
        </MediaColorContext>
    </div>
  )
}

export default TvShowSeasonLayout