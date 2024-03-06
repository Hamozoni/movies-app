
import {Outlet, useLocation, useParams} from 'react-router-dom'
import './MovieLayout.scss';

import MediaHeader from '../../Components/mediaHeader/MediaHeader';
import MainMediaNav from '../../Components/mainMediaNav/MainMediaNav';


const MovieLayout = () => {

    const {id} = useParams();

  return (
    <main className="movie">
        <MainMediaNav mediaType='movie' />
        {
            !useLocation().pathname.endsWith(id) &&
            <MediaHeader mediaType='movie' id={id} />
        }
        <Outlet />
    </main>
  )
}

export default MovieLayout