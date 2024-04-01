import { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import MediaColorContext from "../GlobalStateContext/MediaColorContext";
import fetchData from "../utilities/fetchData";
import { globalContext } from "../GlobalStateContext/GlobalContext";

import Loading from "../Components/loading/Loading";
import Error from "../Components/error/Error";
import MediaHeader from "../Components/sharedComponents/mediaHeader/MediaHeader";
import MainMediaNav from "../Components/sharedComponents/mainMediaNav/MainMediaNav";

const EpisodesLayout = () => {

  const {lang} = useContext(globalContext);

  const {id,seasonNumber,episodeNumber} = useParams();

  const lankUrl = `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;

  const [details,setDetails] = useState(null);
  const [error,setError] = useState(null);
  const [isPending,setIsPending] = useState(true);

  const fetchDetails = ()=>{
    setIsPending(true);
    setError(null);
    fetchData(`${lankUrl}?language=${lang}`)
    .then((data)=> {
      setDetails(data);
      document.title = data.name;
    })
    .catch(error=> {
      setError(error);
    })
    .finally(()=> {
      setIsPending(false)
    })

  }


  useEffect(fetchDetails,[lankUrl,lang]);

  return (
    <div>
        <MediaColorContext>
              <MainMediaNav 
                  linkUrl={lankUrl}
                  overview={['castCrew','translations']} 
                  media={['stills']} 
                  isVideos={true}
                />
              {
                isPending ? <Loading  width='100%' height='200px'/> : 
                details ? 
                <MediaHeader 
                    imageUrl={details?.still_path} 
                    title={`${seasonNumber}×${episodeNumber} ${details?.name}`}
                    navigateTo={`/tv/${id}/season/${seasonNumber}`}
                    linkTitle={lang === 'ar' ? 'الرجوع الي الحلقة' :'back to episode'}
                    year={details.air_date}
                  /> 
                : error && <Error error={error} height='200px' onClick={fetchDetails}/>
            }
            <Outlet />
        </MediaColorContext>
    </div>
  )
}

export default EpisodesLayout