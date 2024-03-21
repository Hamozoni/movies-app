import {languages }from "../../utilities/languages";

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../homeComponents/homeSearchBar/SearchBar";

const Header = ()=> {

    const {theme,lang} = useContext(globalContext);
    const navigate = useNavigate();

    const [isSearch,setisSearch] = useState(false);
    const [isMenu,setIsMenu] = useState(false);
    const [innerWidth,setInnerWidth] = useState(0);

    const handleNavigate = (filter,mediaType)=>{
        navigate(`list/${mediaType}/${filter}`);
    };

    useEffect(()=>{
          setInnerWidth(window.innerWidth)
       const handleResize = (e)=> {
          setInnerWidth(e.target.innerWidth);
       }
        window.addEventListener('resize',handleResize);

        return ()=> window.removeEventListener('resize',handleResize)
    },[])

    const SittingIcons = ({isMobile = false})=> {
        return (
            <>
                <div className="theme">
                    <span>
                        {
                            theme === 'light '?
                            <NightlightOutlinedIcon />
                            : 
                            <LightModeOutlinedIcon />
                        }
                    </span>
                    {
                        isMobile && <h5>theme mode</h5>
                    }
                </div>
                <div className="lang">
                    <span>
                         <TranslateOutlinedIcon />
                    </span>
                    {
                        isMobile && <h5>Languages</h5>
                    }
                </div>
                <div className="notfication">
                    <span>
                        <NotificationsOutlinedIcon />
                    </span>
                    {
                        isMobile && <h5>notifications</h5>
                    }
                </div>
            </>
        )
    }

    return (
        <header className="main-header">
            <div className="header-container">
                <section  className="logo">
                    {
                        innerWidth < 667 &&
                        <MenuIcon 
                            className="menu-icon" 
                            onClick={()=> setIsMenu(true)} 
                            />
                    }
                    <h1 onClick={()=> navigate(`/`)}>myh movies</h1>
                </section>
                <nav className="nav-links">
                    <div 
                        className={`${isMenu && innerWidth < 667 ? 'active mobile': innerWidth < 667 ? 'mobile' : ''} part-one`}  
                        onClick={()=> setIsMenu(false)} >
                        <div className="part-one-contaner">
                            {
                                innerWidth < 667 && 
                                <span  
                                    onClick={()=> setIsMenu(false)} 
                                    className="close-icon" >
                                        <CloseIcon />
                                </span>
                            }
                            {
                                <SittingIcons isMobile={innerWidth < 667} />
                            }
                            <div >
                                <h4> {languages[lang].movies} </h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','movie')}>
                                            {languages[lang].popular}
                                    </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('now_playing','movie')}>
                                            {languages[lang].nowPlaying}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('upcoming','movie')}>
                                            {languages[lang].upComing}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('top_rated','movie')}>
                                            {languages[lang].topRated}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4>{languages[lang].tvShows}</h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','tv')}>
                                            {languages[lang].popular}
                                        </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('airing_today','tv')}>
                                            {languages[lang].airingToday}
                                    </li>
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('on_the_air','tv')}>
                                            {languages[lang].onTv}
                                    </li>
                                    <li 
                                    className="nav-btn link-hover"
                                    onClick={()=> handleNavigate('top_rated','tv')}>
                                        {languages[lang].topRated}
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4> {languages[lang].people}</h4>
                                <ul className="fiter">
                                    <li 
                                        className="nav-btn link-hover"
                                        onClick={()=> handleNavigate('popular','person')}>
                                            {languages[lang].popular} people
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="part-two">

                        {
                            innerWidth > 480 &&
                            <SittingIcons isMobile={innerWidth < 481} />
                        }
                        <div className="acount">
                            <PersonAddOutlinedIcon />
                        </div>
                        <div className="search-icon" 
                             onClick={()=> setisSearch(!isSearch)}
                             >
                                {
                                    isSearch ? 
                                     <div  className="cancel-icon">
                                         <CloseIcon /> 

                                     </div>
                                    :<SearchOutlinedIcon />
                                }
                        </div>

                    </div>
                </nav>
                {
                    isSearch && <SearchForm />
                }
            </div>
        </header>
    );
};

export default Header;