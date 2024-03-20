import { Outlet, useParams } from "react-router-dom"
import SeasonHeader from "../../Components/tvComponents/seasonMainNav/SeasonHeader"
import SeasonMainNav from "../../Components/tvComponents/seasonMainNav/SeasonMainNav"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext"
import { useEffect, useState } from "react"
import fetchData from "../../utilities/fetchData"
import Loading from "../../Components/loading/Loading"
import Error from "../../Components/error/Error"


const EpisodesLayout = () => {
  const {id,seasonNumber,episodeNumber} = useParams();

  const [details,setDetails] = useState(null);
  const [error,setError] = useState(null);
  const [isPending,setIsPending] = useState(true);

  const fetchDetails = ()=>{
    setIsPending(true);
    setError(null);
    fetchData(`tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`)
    .then((data)=> {
      setDetails(data);
      setIsPending(false);
    })
    .catch(error=> {
      setError(error);
      setIsPending(false);
    });

  }

  useEffect(fetchDetails,[id,seasonNumber,episodeNumber]);

  return (
    <div>
        <MediaColorContext>
                <SeasonMainNav isEpisode={true}  />
                {
                  isPending ? <Loading  width='100%' height='200px'/> : 
                  details ? 
                  <SeasonHeader details={details} isEpisode={true} />
                  : error && <Error error={error} height='200px' onClick={fetchDetails}/>
                }
                <Outlet />
        </MediaColorContext>
    </div>
  )
}

export default EpisodesLayout