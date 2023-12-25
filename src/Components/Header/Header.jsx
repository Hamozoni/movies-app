import {languages }from "../../Utilities/languages";

import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import "./Header.scss";
import { useContext } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

const Header = ()=> {

    const {theme, setTheme,lang, setLang} = useContext(globalContext);

    return (
        <header className="main-header">
            <div className="header-container">
                <section className="logo">
                    <h1>myh movies</h1>
                </section>
                <nav className="nav-links">
                    <div className="part-one">
                        <h4>{languages[lang].movies}</h4>
                        <h4>{languages[lang].tvShows}</h4>
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
                        <div className="search-icon">
                             <SearchOutlinedIcon />
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;