import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useLocation, useParams } from 'react-router-dom';

const MainMediaNav = () => {
    const id = useLocation().search.split('=')[1];
  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link to={`/movie?id=${id}`}>main</Link></li>
                    <li><Link to={`/movie?id=${id}/titles`}>alternative tiltes</Link></li>
                    <li><Link to={`/movie?id=${id}/cast`}>cast & crew</Link></li>
                    <li><Link to={`/movie?id=${id}/releases`}>release dates</Link></li>
                    <li><Link to={`/movie?id=${id}/translations`}>translations</Link></li>
                    <li><Link>changes</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span>media</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link>backdrops</Link></li>
                    <li><Link>logos</Link></li>
                    <li><Link>posters</Link></li>
                    <li><Link>videos</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span> fandom</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link>discussions</Link></li>
                    <li><Link to={`/movie/${id}/reviews`}>reviews</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span> share</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link>share link</Link></li>
                    <li><Link>facebook</Link></li>
                    <li><Link>tweet</Link></li>
                 </ul>
             </div>
        </nav>
    </header>
  )
}

export default MainMediaNav