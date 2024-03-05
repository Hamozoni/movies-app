import MainMediaNav from "../../Components/movieComponents/MainMediaNav/MainMediaNav";
import {Outlet} from 'react-router-dom'
import './MovieLayout.scss';

const MovieLayout = () => {
  return (
    <main className="movie">
        <MainMediaNav />
        <Outlet />
    </main>
  )
}

export default MovieLayout