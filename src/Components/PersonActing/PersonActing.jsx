import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

const PersonActing = ({knownFor}) => {

    console.log(knownFor)
  return (
    <section className="pers-acting">
        <header className="pers-acting-head">
            <h4>Acting</h4>
            <nav>
                <ul>
                    <li> all <ArrowDropDownIcon /></li>
                    <li> department <ArrowDropDownIcon /></li>
                </ul>
            </nav>
        </header>
        <table className="acting-content">
            <tbody>
                {
                    knownFor?.cast?.map((movie)=>(
    
                        <tr key={movie?.id} className="part">
                            <td className='year'>
                                {  movie?.release_date || movie?.first_air_date}
                            </td>
                            <td>
                                <span className='cercle'></span>
                            </td>
                            <td>    
                                <Link to={''}>
                                    { movie?.title || movie?.name}
                                </Link>
                                <span>as {movie?.character}</span>
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