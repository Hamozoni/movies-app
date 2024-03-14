import { useContext, useEffect, useRef, useState } from "react";
import { languages } from "../../../utilities/languages"
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../utilities/fetchData";

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
   const [images,setImages] = useState([]);
   const [isPending,setIsPending] = useState(true);
   const [error,setError] = useState(null);


   const imgIdex= Math.ceil(Math.random() * 20);

   useEffect(()=>{
    setIsPending(true);
    setError(null);
       fetchData(`trending/movie/week?language=${lang}&page=1`)
       .then((data)=>{
           setImages(data?.results);
           setIsPending(false);

           console.log(data?.results);
       })
       .catch(error=> {
            setIsPending(false);
            setError(error);
       })
   },[lang]);



    return (
        <div 
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${images[imgIdex]?.backdrop_path})`}}
            className="search-bar" >
            <section
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