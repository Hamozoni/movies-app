import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";

const MainMediaNav = () => {
  return (
    <header className='media-header'>
        <nav className='media-nav'>
             <div className='med-title'>
                 <span>overview</span>
                 <span><ArrowDropDownIcon /></span>
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