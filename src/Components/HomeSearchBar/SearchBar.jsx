import { useContext } from "react";
import { languages } from "../../Utilities/languages"
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./SearchBar.scss";

const SearchBar = ()=> {

   const { lang, theme} = useContext(globalContext);
    return (
        <div className="search-bar" >
            <section className={`${theme} search-bar-container`}>
                 <h3 className="welcome">
                    {languages[lang].welcome}
                 </h3>
                 <h4>
                    {languages[lang].millionsOf}
                 </h4>
                 <form className="search-form">
                    <input type="search" placeholder="Search for a movie,tv shows, person...." />
                    <button className="search-btn">
                        {languages[lang].search}
                    </button>
                 </form>
            </section>
        </div>
    );
};

export default SearchBar;