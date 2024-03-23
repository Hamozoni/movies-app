import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

import fetchData from "../../../utilities/fetchData";
import VideosCard from "./VideosCard";

import "./mediaVideos.scss";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";



const MediaVideos = ({mediaType,isSeason = false,isEpisode = false}) => {

    const {color} = useContext(mediaColorContext);

    const type = useLocation()?.search?.split('=')[1]?.replaceAll('%20',' ');
    const {id,seasonNumber,episodeNumber} = useParams();

    const navigate = useNavigate();

    console.log(type);

    const [videos,setVideos] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchVideos = ()=> {
        let season = '';
        if(isSeason){
            season = `/season/${seasonNumber}`
        }
        if(isEpisode){
            season = `/season/${seasonNumber}/episode/${episodeNumber}` 
        }
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${id}${season}/videos?language=en-US`)
        .then((data)=> {

            if(type == undefined && data.results.length > 0) {
                navigate(`/${mediaType}/${id}/videos?type=${data.results[0].type}`)
            }
            const videosObject = Object.groupBy(data?.results,e => e.type);
            setVideos(videosObject);
            setIsPending(false);

        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        })
    }

    useEffect(fetchVideos,[type,id,mediaType]);

    if(isPending) {
        return (
            <Loading width='100%' height='calc(100vh - 100px)' />
        )
    }
    if(error) {
        return (
            <Error error={error} height='calc(100vh - 100px)' onClick={fetchVideos}/>
        )
    }

  return (
    <div className="media-videos alt-titles">
        <div className="vid-container alt-content">
            <nav className="vid-nav alt-cout-list card">
                <header 
                    style={{backgroundColor: color.backColor}}
                    className="vid-head cout-header">
                    <h3 className="t"  style={{color: color.textColor}}>
                        vidoes
                    </h3>
                </header>
                <ul className="vid-ul cout-list">
                    {
                      Object.keys(videos)?.map((video)=> (
                        <li 
                            onClick={()=> navigate(`/${mediaType}/${id}/videos?type=${video}`)}
                            className={`${type === video && 'active'} nav-btn`}>
                            {video}
                            <span>{videos[video]?.length}</span>
                        </li>
                      ))
                    }
                </ul>
            </nav>
            <div className="vid-content alt-t-tabels">
                {
                    videos[type]?.map((video)=> (
                        <VideosCard yId={video?.key}  type={type} title={video?.name}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default MediaVideos