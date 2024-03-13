import { useEffect, useState } from "react";

import YouTubeIcon from '@mui/icons-material/YouTube';
import VerifiedIcon from '@mui/icons-material/Verified';
import fetchYoutubeData from "../../../utilities/fetchYoutubeData";



const VideosCard = ({yId,type,title})=> {

    const [videoInfo,setVideoIfo] = useState({});

    useEffect(()=>{
        fetchYoutubeData(`video?id=${yId}`)
        .then((data)=> {
            setVideoIfo(data);
        })

    },[yId]);

    const getLengthSeconds = (s)=> {
        const m = s / 60;
        const se = s % 60;
        return `${m.toFixed(0)}:${se}`
    }

    return (
        <div className="vid-card">
            <div className="vid-image">
                {
                    videoInfo?.thumbnail && 
                   <img src={videoInfo?.thumbnail[3]?.url || videoInfo?.thumbnail[0]?.url } alt={type} />
                }
            </div>
            <div className="vid-info">
                <div className="title-date">
                    <h3 className="name">{title}</h3>
                    <p className="d">
                        {type} . {getLengthSeconds(videoInfo?.lengthSeconds)} {new Date(videoInfo?.publishDate)?.toDateString()}
                    </p>
                </div>
                <div className="yout-ch">
                    <span className="icon">
                        <YouTubeIcon />
                    </span>
                    <span className="ch-t">
                        {videoInfo?.channelTitle}
                    </span>
                    <span className="veri">
                        <VerifiedIcon />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideosCard