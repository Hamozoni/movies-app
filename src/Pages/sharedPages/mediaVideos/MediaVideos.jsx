import { useLocation } from "react-router-dom"


const MediaVideos = () => {

    const type = useLocation()?.search?.split('=')[1]?.replaceAll('%20',' ');
    
  return (
    <div className="media-videos">
        {type}
    </div>
  )
}

export default MediaVideos