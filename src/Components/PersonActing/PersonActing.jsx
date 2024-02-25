import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

import "./PersonActing.scss";
// import { KingBed } from '@mui/icons-material';

const PersonActing = ({knownFor}) => {

    console.log(knownFor)
  return (
    <section className="pers-acting">
        <header className="pers-acting-head">
            <h4>Acting</h4>
            <nav className='acting-nav'>
                <ul className='acting-ul'>
                    <li> all <ArrowDropDownIcon /></li>
                    <li> department <ArrowDropDownIcon /></li>
                </ul>
            </nav>
        </header>
        <table className="credits-tabel">
            <tbody className='credits-tabel-body'>
                {
                    knownFor?.cast?.map((movie)=>(
    
                        <tr key={movie?.id} className="part">
                            <td className='year'>
                                {new Date(movie?.release_date)?.getFullYear()  || new Date(movie?.first_air_date)?.getFullYear() || '___'}
                            </td>
                            <td className='cercle'>
                                <span ></span>
                            </td>
                            <td className='movie-title'> 
                                <tr>
                                    <Link to={`/${movie?.media_type}/${movie?.id}`}>
                                        { movie?.title || movie?.name}
                                    </Link>
                                </tr> 
                                <tr>
                                     <span>as {movie?.character}</span>
                                </tr>  
                            </td>

                        </tr>
                    ))
                }
            </tbody>
        </table>
    </section>
  )
}

export default PersonActing