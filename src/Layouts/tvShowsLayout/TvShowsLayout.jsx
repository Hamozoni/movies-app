import { Outlet, useLocation, useParams } from "react-router-dom"

import MainMediaNav from '../../Components/sharedComponents/mainMediaNav/MainMediaNav';
import MediaHeader from '../../Components/sharedComponents/mediaHeader/MediaHeader';

const TvShowsLayout = () => {

  const {id} = useParams();
  return (
    <main className="tv"> 
        <div className="tv-container">
            <MainMediaNav mediaType='tv' />
            {
              !useLocation().pathname.endsWith(id) && 
              <MediaHeader mediaType='tv' id={id} />
            }
            <Outlet />
        </div>
    </main>
  )
}

export default TvShowsLayout