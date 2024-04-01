import MenuIcon from '@mui/icons-material/Menu';

import "./Header.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { SearchForm } from "../../homeComponents/homeSearchBar/SearchBar";
import { languages } from '../../../utilities/languages';

import HeaderNav from '../headerNav/HeaderNav';
import HeaderIcons from '../headerIcons/HeaderIcons';

const Header = ()=> {

    const {theme,lang,innerWidth} = useContext(globalContext);
    const navigate = useNavigate();

    const [isSearch,setisSearch] = useState(false);
    const [isMenu,setIsMenu] = useState(false);


    return (
        <header className={`main-header back-color-${theme}-1`}>
            <div className="header-container">
                <div className="logo-nav">
                    <section  className="logo">
                        {
                            innerWidth < 667 &&
                            <MenuIcon 
                                className={`menu-icon t-color-${theme}`} 
                                onClick={()=> setIsMenu(true)} 
                                />
                        }
                        <h1 onClick={()=> navigate(`/`)}>
                            {languages[lang].logo}
                        </h1>
                    </section>
                    <HeaderNav isMenu={isMenu} setIsMenu={setIsMenu}/>
                </div>
                <HeaderIcons setisSearch={setisSearch} isSearch={isSearch} />
                {
                    isSearch && <SearchForm />
                }
            </div>
        </header>
    );
};

export default Header;