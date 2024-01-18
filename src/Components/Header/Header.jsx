import {languages }from "../../Utilities/languages";

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';

import "./Header.scss";
import { useContext, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../HomeSearchBar/SearchBar";

const Header = ()=> {

    const {theme,lang} = useContext(globalContext);
    const navigate = useNavigate();

    const [isSearch,setisSearch] = useState(false);

    const handleNavigate = (filter)=>{
        navigate(`/movies/${filter}`);
    };

    return (
        <header className="main-header">
            <div className="header-container">
                <section onClick={()=> navigate(`/`)} className="logo">
                    <h1>myh movies</h1>
                </section>
                <nav className="nav-links">
                    <div className="part-one">
                        <h4 >
                            {languages[lang].movies} 
                            <ul className="fiter">
                                <li onClick={()=> handleNavigate('popular')}>{languages[lang].popular}</li>
                                <li onClick={()=> handleNavigate('now_playing')}>{languages[lang].nowPlaying}</li>
                                <li onClick={()=> handleNavigate('upcoming')}>{languages[lang].upComing}</li>
                                <li onClick={()=> handleNavigate('top_rated')}>{languages[lang].topRated}</li>
                            </ul>
                        </h4>
                        <h4>
                            {languages[lang].tvShows}
                            <ul className="fiter">
                                <li onClick={()=> handleNavigate('popular')}>{languages[lang].popular}</li>
                                <li onClick={()=> handleNavigate('now_playing')}>{languages[lang].airingToday}</li>
                                <li onClick={()=> handleNavigate('upcoming')}>{languages[lang].onTv}</li>
                                <li onClick={()=> handleNavigate('top_rated')}>{languages[lang].topRated}</li>
                            </ul>
                        </h4>
                        <h4>{languages[lang].people}</h4>
                    </div>
                    <div className="part-two">
                        <div className="theme">
                            {
                                theme === 'light '?
                                <NightlightOutlinedIcon />
                                : 
                                <LightModeOutlinedIcon />
                            }
                        </div>
                        <div className="lang">
                            <TranslateOutlinedIcon />
                        </div>
                        <div className="notfication">
                            <NotificationsOutlinedIcon />
                        </div>
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