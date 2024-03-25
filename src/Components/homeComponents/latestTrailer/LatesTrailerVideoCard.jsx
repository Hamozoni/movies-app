import { useContext, useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData"
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useNavigate } from "react-router-dom";


const LatesTrailerVideoCard = ({detail,onMouse}) => {

    const {setTrailer,lang} = useContext(globalContext);

    const [video,setVideo] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchVideos = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`movie/${detail.id}/videos?language=${lang}&page=2`)
        .then((data)=> {
            setVideo(data?.results[0]);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false)
        })
    };

  useEffect(fetchVideos,[detail,lang]);

  const handleTrailer = ( )=> {
    setTrailer({isTrailer: true,youtubeId : video?.key,type: video?.type})
  };

  const navigate = useNavigate();

  return (
        <div  
            onMouseEnter={onMouse}
            className="trailer-media">
            <div 
                className="trailer-image" 
                onClick={()=> handleTrailer(detail?.id)}
                >
                <img 
                    loading="lazy"
                    src={process.env.REACT_APP_BASE_URL + 'original' + detail?.backdrop_path} 
                    alt={detail?.title} 
                    />
                <div className="more-info">
                    {
                        isPending ? <Loading width='100%' height='100%' /> : video ?
                        <MoreHorizRoundedIcon />
                        : error && <Error error={error} height='100%' onClick={fetchVideos} />
                    }
                </div>
                <span className="pay-trailer">
                    <PlayArrowRoundedIcon />
                </span>
            </div>
            <div className="trailer-titles">
                <h3 className="name"  onClick={()=> navigate(`/movie/${detail.id}`)}>
                 
                    {detail?.title}
                </h3>
                <p className="tr-type">{video  && video?.name}</p>
            </div>
        </div>
  )
}

export default LatesTrailerVideoCard