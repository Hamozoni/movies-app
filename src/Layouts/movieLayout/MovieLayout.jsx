
import {Outlet, useLocation, useParams} from 'react-router-dom'
import './MovieLayout.scss';
import MainMediaNav from '../../Components/sharedComponents/mainMediaNav/MainMediaNav';
import MediaHeader from '../../Components/sharedComponents/mediaHeader/MediaHeader';
import MediaColorContext from '../../GlobalStateContext/MediaColorContext';

const MovieLayout = () => {

    const {id} = useParams();


  return (
      <main className="movie">
         <MediaColorContext>
            <MainMediaNav mediaType='movie' />
              {
                !useLocation().pathname.endsWith(id) &&
                <MediaHeader mediaType='movie' id={id} />
              }
            <Outlet />
         </MediaColorContext>
      </main>
  )
}

export default MovieLayout