
import {Outlet, useLocation, useParams} from 'react-router-dom'
import './MovieLayout.scss';
import MainMediaNav from '../../Components/sharedComponents/mainMediaNav/MainMediaNav';
import MediaHeader from '../../Components/sharedComponents/mediaHeader/MediaHeader';


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