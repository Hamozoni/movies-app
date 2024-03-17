import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"

import fetchData from "../../../utilities/fetchData";
import VideosCard from "./VideosCard";

import "./mediaVideos.scss";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";



const MediaVideos = ({mediaType}) => {

    const {color} = useContext(mediaColorContext);

    const type = useLocation()?.search?.split('=')[1]?.replaceAll('%20',' ');
    const {id} = useParams();

    const navigate = useNavigate();

    console.log(type);

    const [videos,setVideos] = useState({});

    useEffect(()=> {
        fetchData(`${mediaType}/${id}/videos?language=en-US`)
        .then((data)=> {

            const videosObject = Object.groupBy(data?.results,e => e.type);
            setVideos(videosObject);
            if(type === undefined) {
                navigate(`/${mediaType}/${id}/videos?type=${data.results[0].type}`)
            }

        })
    },[type,id,mediaType]);

  return (
    <div className="media-videos">
        <div className="vid-container">
            <nav className="vid-nav">
                <header 
                    style={{backgroundColor: color.backColor}}
                    className="vid-head">
                    <h3 className="t"  style={{color: color.textColor}}>
                        vidoes
                    </h3>
                </header>
                <ul className="vid-ul">
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
            <div className="vid-content">
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