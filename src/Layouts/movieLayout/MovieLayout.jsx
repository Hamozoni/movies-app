
import {Outlet} from 'react-router-dom'
import './MovieLayout.scss';
import MainMediaNav from '../../Components/movieComponents/MainMediaNav/MainMediaNav';

const MovieLayout = () => {
  return (
    <main className="movie">
        <MainMediaNav />
        <Outlet />
    </main>
  )
}

export default MovieLayout