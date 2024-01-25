import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";
import { Link } from 'react-router-dom';

const MainMediaNav = () => {
  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
                 <ul className='links-list'>
                    <li>
                        <Link>main</Link>
                    </li>
                    <li>
                        <Link>alternative tiltes</Link>
                    </li>
                    <li>
                        <Link>cast & crew</Link>
                    </li>
                    <li>
                        <Link>release dates</Link>
                    </li>
                    <li>
                        <Link>translations</Link>
                    </li>
                    <li>
                        <Link>changes</Link>
                    </li>
                 </ul>
             </div>
             <div className='med-title'>
                 <span>media</span>
                 <span><ArrowDropDownIcon /></span>
             </div>
             <div className='med-title'>
                 <span> fandom</span>
                 <span><ArrowDropDownIcon /></span>
             </div>
             <div className='med-title'>
                 <span> share</span>
                 <span><ArrowDropDownIcon /></span>
             </div>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
             </div>
        </nav>
    </header>
  )
}

export default MainMediaNav