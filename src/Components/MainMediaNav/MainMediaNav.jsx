import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";

const MainMediaNav = () => {
  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <h4 className='med-title'>
                overview
                <ArrowDropDownIcon />
             </h4>
             <h4 className='med-title'>
                media
                <ArrowDropDownIcon />
             </h4>
             <h4 className='med-title'>
                fandom
                <ArrowDropDownIcon />
             </h4>
             <h4 className='med-title'>
                share
                <ArrowDropDownIcon />
             </h4>
        </nav>
    </header>
  )
}

export default MainMediaNav