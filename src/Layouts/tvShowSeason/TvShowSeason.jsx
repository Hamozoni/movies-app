import { Outlet, useParams } from "react-router-dom"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"
import { createContext, useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";
import MediaHeader from "../../Components/sharedComponents/mediaHeader/MediaHeader";
import MainMediaNav from "../../Components/sharedComponents/mainMediaNav/MainMediaNav";

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
            document.title = data.name;
        })
        .catch(error=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false);
        });

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
    };

    const lankUrl = `tv/${id}/season/${seasonNumber}`;


  return (
    <div className="TvShows-layout">
        <MediaColorContext>
            <episodesContext.Provider value={{episodes}}>
                <MainMediaNav 
                    mediaType='tvSeason' 
                    linkUrl={lankUrl} 
                    overview={['castCrew','translations']} 
                    media={['posters']} 
                    isVideos={true}
                    />
                <MediaHeader 
                      imageUrl={episodes?.poster_path} 
                      title={episodes?.name}
                      navigateTo={`/tv/${id}/seasons`}
                      linkTitle={lang === 'ar' ? 'الرجوع لقائمة المواسم' : 'back to seasons list'}
                      year={episodes?.air_date}
                      /> 
                <Outlet />
            </episodesContext.Provider>
        </MediaColorContext>
    </div>
  )
}

export default TvShowSeasonLayout