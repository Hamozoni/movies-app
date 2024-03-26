import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';

import "./PersonActing.scss";
import { useContext, useEffect, useState } from 'react';
import ActingMediaCard from '../actingMediaCard/ActingMediaCard';
import { languages } from '../../../utilities/languages';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const PersonActing = ({knownFor}) => {

    const [mediaCardIndex,setMediaCardIndex] = useState(0);
    const [isMediaOpen,setIsMediaOpen] = useState(false);

    const {lang} = useContext(globalContext);


    useEffect(()=>{
        if(isMediaOpen === true){
            const handleClick = (e)=> {
                if(!e.target.classList.contains('open')){
                    
                    setIsMediaOpen(false);
                }
            };
            const root = document.getElementById('root');
            
            root.addEventListener('click',handleClick);
            
            return ()=> root.removeEventListener('click',handleClick)
        };
    },);

console.log(isMediaOpen)
  return (
    <section className="pers-acting">
        <header className="pers-acting-head">
            <h4>{languages[lang]?.acting}</h4>
            <nav className='acting-nav'>
                <ul className='acting-ul'>
                    <li> {languages[lang]?.all} <ArrowDropDownIcon /></li>
                    <li> {languages[lang]?.department} <ArrowDropDownIcon /></li>
                </ul>
            </nav>
        </header>
        <table className="credits-tabel">
            <tbody className='credits-tabel-body '>
                {
                    knownFor?.cast?.map((movie,i)=>(  
                        <tr key={movie?.id} className="part">
                            <td className='year'>
                                {new Date(movie?.release_date)?.getFullYear()  || new Date(movie?.first_air_date)?.getFullYear() || '___'}
                            </td>
                            <td className='cercle open'>
                                <span 
                                    className='open' 
                                    onClick={()=> {
                                        setMediaCardIndex(i)
                                        setIsMediaOpen(true);
                                    }} 
                                   >

                                </span>
                                {
                                    isMediaOpen && i === mediaCardIndex ? 
                                    <ActingMediaCard mediaType={movie?.media_type} id={movie?.id}/> :''
                                }
                            </td>
                            <td className='movie-title'> 
                                <tr>
                                    <Link to={`/${movie?.media_type}/${movie?.id}`} className='link-hover'>
                                        { movie?.title || movie?.name}
                                    </Link>
                                </tr> 
                                {
                                    movie?.character &&
                                    <tr>
                                        <span>as {movie?.character}</span>
                                    </tr>  
                                }
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