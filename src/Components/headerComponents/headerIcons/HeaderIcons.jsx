import { useContext} from "react";

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';

import "./headerIcons.scss";

import {languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

const HeaderIcons = ({setisSearch,isSearch}) => {

    const {theme,setTheme,lang,setLang} = useContext(globalContext);

  return (
    <div className="h-icons-box">
        <div className="lang-theme icons">
                {
                    theme === 'light '?
                    <NightlightOutlinedIcon className={`t-color-${theme}-1`} />
                    : 
                    <LightModeOutlinedIcon className={`t-color-${theme}-1`} />
                }
            
            <ul className={`back-color-${theme}-2 lang-theme-container ${lang}`}>
                <li 
                    className={`${theme === 'dark' && 'active'} t-color-${theme}-2 nav-btn`}
                    onClick={()=> {
                        window.localStorage.setItem('myh-movies-theme','dark');
                        setTheme('dark')
                    }}
                    >{languages[lang].dark}
                </li>
                <li 
                    className={`${theme === 'light' && 'active'} t-color-${theme}-2 nav-btn`}
                    onClick={()=>{
                        window.localStorage.setItem('myh-movies-theme','light');
                        setTheme('light')
                    }}
                    >{languages[lang].light}
                </li>
            </ul>
        </div>
        <div className="lang-theme icons" >
            <span className={`lang-t t-color-${theme}-1`} >
                {lang}
            </span>
            <ul className={`back-color-${theme}-2 lang-theme-container ${lang}`}>
                <li 
                    className={`${lang === 'ar' && 'active'} t-color-${theme}-2 nav-btn`}
                    onClick={()=> {
                        window.localStorage.setItem('myh-movies-lang','ar');
                        setLang('ar')
                    }}
                    >{languages[lang].arabic}
                </li>
                <li 
                    className={`${lang === 'en' && 'active'} t-color-${theme}-2 nav-btn`}
                    onClick={()=>{
                        window.localStorage.setItem('myh-movies-lang','en');
                        setLang('en')
                    }}
                    >{languages[lang].english}
                </li>
            </ul>
        </div>
        <div className="search-icon" 
            onClick={()=> setisSearch(!isSearch)}
            >
                {
                    isSearch ? 
                    <div  className={`t-color-${theme}-1 cancel-icon`}>
                        <CloseIcon /> 

                    </div>
                    :<SearchOutlinedIcon className={`t-color-${theme}-1 `} />
                }
        </div>
    </div>
  )
}

export default HeaderIcons