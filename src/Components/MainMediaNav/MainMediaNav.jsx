import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "./MainmediaNav.scss";

const MainMediaNav = () => {
  return (
    <header>
        <nav>
             <h4>
                overview
                <ArrowDropDownIcon />
             </h4>
             <h4>
                media
                <ArrowDropDownIcon />
             </h4>
             <h4>
                fandom
                <ArrowDropDownIcon />
             </h4>
             <h4>
                share
                <ArrowDropDownIcon />
             </h4>
        </nav>
    </header>
  )
}

export default MainMediaNav