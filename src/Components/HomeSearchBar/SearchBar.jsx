import { useContext, useState } from "react";
import { languages } from "../../Utilities/languages"
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";

export const SearchForm = ()=> {
    const { lang } = useContext(globalContext);

    const [query,setQuery] = useState('');
    const navigate = useNavigate()

    const handleSearch = (e)=> {
        e.preventDefault();
        if(query?.length > 1){
            navigate(`/search/movie?query=${query}`)
        }

   };
    return (
        <form className="search-form">
        <input 
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            type="search" 
            placeholder="Search for a movie,tv shows, person...." />
        <button 
            onClick={(e)=> handleSearch(e)}
            className="search-btn">
            {languages[lang].search}
        </button>
     </form>
    )
};

const SearchBar = ()=> {

   const { lang, theme} = useContext(globalContext);



    return (
        <div className="search-bar" >
            <section 
                style={{backgroundImage: `${process.env.REACT_APP_BA}`}}
                className={`${theme} search-bar-container`}
                >
                 <h3 className="welcome">
                    {languages[lang].welcome}
                 </h3>
                 <h4>
                    {languages[lang].millionsOf}
                 </h4>
                 <SearchForm />
            </section>
        </div>
    );
};

export default SearchBar;