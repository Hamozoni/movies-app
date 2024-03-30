import { useContext, useEffect, useState } from "react";

import YouTubeIcon from '@mui/icons-material/YouTube';
import VerifiedIcon from '@mui/icons-material/Verified';
import fetchYoutubeData from "../../../utilities/fetchYoutubeData";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import "./videosCard.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";

const VideosCard = ({yId,type,title})=> {
    
    const {setTrailer,theme} = useContext(globalContext);

    const [videoInfo,setVideoIfo] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchVideos = ()=>{
        setIsPending(true);
        setError(null);
        fetchYoutubeData(`video?id=${yId}`)
        .then((data)=> {
            setVideoIfo(data);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })

    }

    useEffect(fetchVideos,[yId]);

    const getLengthSeconds = (s)=> {
        const m = s / 60;
        const se = s % 60;
        return `${m.toFixed(0)}:${se}`
    }

    const handleTrailer = ()=> {
        setTrailer( {isTrailer: true,youtubeId: yId,type})
    }

    return (
        <div className="vid-card card">
            {
                isPending ? <Loading width='calc(100vw - 400px)' height='188px' /> : videoInfo ? 
                <div className="vid-cont">
                    <div className="vid-image" onClick={handleTrailer}>
                        {
                            videoInfo?.thumbnail && 
                            <img 
                                loading="lazy" 
                                src={videoInfo?.thumbnail[3]?.url || videoInfo?.thumbnail[0]?.url } 
                                alt={type}
                              />
                        }
                        <div className="play-icon scale">
                            <PlayArrowRoundedIcon />
                        </div>
                    </div>
                    <div className="vid-info">
                        <div className="title-date">
                            <h3 className={`t-color-${theme} name`}>
                                {title}
                            </h3>
                            <p className={`t-color-${theme}-2 d`}>
                                {type} . {getLengthSeconds(videoInfo?.lengthSeconds)} {new Date(videoInfo?.publishDate)?.toDateString()}
                            </p>
                        </div>
                        <div className={`back-color-${theme}-1 yout-ch`}>
                                <YouTubeIcon className={`t-color-${theme}-3`} />
                            <span className={`t-color-${theme}-2 ch-t`}>
                                {videoInfo?.channelTitle}
                            </span>
                                <VerifiedIcon  className={`t-color-${theme}-3`}/>
                        </div>
                    </div>
                </div>
                : error && <Error error={error}  height='188px' onClick={fetchVideos} />
            }
        </div>
    )
}

export default VideosCard