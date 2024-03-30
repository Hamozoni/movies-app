import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom"

import fetchData from "../../../utilities/fetchData";
import VideosCard from "./VideosCard";

import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { languages } from "../../../utilities/languages";



const MediaVideos = () => {

    const {color} = useContext(mediaColorContext);

    const navigate = useNavigate();

    const {lang,theme} = useContext(globalContext);

    const [videos,setVideos] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const pathName = useLocation().pathname;
    const type = useLocation()?.search?.split('=')[1]?.replaceAll('%20',' ');

    const fetchVideos = ()=> {

        setIsPending(true);
        setError(null);
        fetchData(`${pathName}?language=${lang}`)
        .then((data)=> {

            if(type === undefined && data.results.length > 0) {
                navigate(`?type=${data.results[0].type}`)
            }
            const videosObject = Object.groupBy(data?.results,e => e.type);
            setVideos(videosObject);

        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }
    useEffect(fetchVideos,[type,pathName,lang,navigate]);

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
            <nav className={`back-color-${theme}-1 vid-nav alt-cout-list`}>
                <header 
                    style={{backgroundColor: color.backColor}}
                    className="vid-head cout-header">
                    <h3 className="t"  style={{color: color.textColor}}>
                        {languages[lang].vidoes}
                    </h3>
                </header>
                <ul className="vid-ul cout-list">
                    {
                      Object.keys(videos)?.map((video)=> (
                        <li 
                            onClick={()=> navigate(`?type=${video}`)}
                            className={`${type === video ? 'active' : ''} nav-btn t-color-${theme}-2`}>
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