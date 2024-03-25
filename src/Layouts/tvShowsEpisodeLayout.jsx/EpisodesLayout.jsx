import { Outlet, useParams } from "react-router-dom"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"
import { useEffect, useState } from "react"
import fetchData from "../../utilities/fetchData"
import Loading from "../../Components/loading/Loading"
import Error from "../../Components/error/Error"
import MediaHeader from "../../Components/sharedComponents/mediaHeader/MediaHeader"
import MainMediaNav from "../../Components/sharedComponents/mainMediaNav/MainMediaNav"


const EpisodesLayout = () => {



  const {id,seasonNumber,episodeNumber} = useParams();

  const lankUrl = `tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;

  const [details,setDetails] = useState(null);
  const [error,setError] = useState(null);
  const [isPending,setIsPending] = useState(true);

  const fetchDetails = ()=>{
    setIsPending(true);
    setError(null);
    fetchData(`${lankUrl}?language=en-US`)
    .then((data)=> {
      setDetails(data);
    })
    .catch(error=> {
      setError(error);
    })
    .finally(()=> {
      setIsPending(false)
    })

  }


  useEffect(fetchDetails,[id,seasonNumber,episodeNumber]);

  return (
    <div>
        <MediaColorContext>
              <MainMediaNav mediaType='tvEpisode' linkUrl={lankUrl} />
                {
                  isPending ? <Loading  width='100%' height='200px'/> : 
                  details ? 
                  <MediaHeader 
                      imageUrl={details?.still_path} 
                      title={`${seasonNumber}×${episodeNumber} ${details?.name}`}
                      navigateTo={`/tv/${id}/season/${seasonNumber}`}
                      linkTitle='back to episode'
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