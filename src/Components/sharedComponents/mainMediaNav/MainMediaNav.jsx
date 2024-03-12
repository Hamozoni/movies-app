import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link, useParams } from 'react-router-dom';

const MainMediaNav = ({mediaType}) => {
    const {id} = useParams();

  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link to={`/${mediaType}/${id}`}>main</Link></li>
                    <li><Link to={`/${mediaType}/${id}/titles`}>alternative tiltes</Link></li>
                    <li><Link to={`/${mediaType}/${id}/cast`}>cast & crew</Link></li>
                    {
                        mediaType === 'tv' ? 
                        (
                            <>
                               <li><Link to={`/${mediaType}/${id}/episode_groups`}>episode groups</Link></li>
                               <li><Link to={`/${mediaType}/${id}/seasons`}>seasons</Link></li>
                            </>
                        ): 
                        (

                           <li><Link to={`/${mediaType}/${id}/releases`}>release dates</Link></li>
                        )
                    }
                    <li><Link to={`/${mediaType}/${id}/translations`}>translations</Link></li>
                    <li><Link to={`/${mediaType}/${id}/changes`}>changes</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span>media</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link to={`/${mediaType}/${id}/backdrops`} > backdrops </Link> </li>
                    <li><Link to={`/${mediaType}/${id}/logos`} >logos</Link></li>
                    <li><Link to={`/${mediaType}/${id}/posters`} >posters</Link></li>
                    <li><Link>videos</Link></li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span> fandom</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li><Link>discussions</Link></li>
                    <li><Link to={`/${mediaType}/${id}/reviews`}>reviews</Link></li>
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