import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import fetchData from "../../../utilities/fetchData";

import { languages } from "../../../utilities/languages"
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

import "./SearchBar.scss";

import Loading from "../../loading/Loading";
import Error from "../../error/Error";

export const SearchForm = ()=> {

    const { lang,theme } = useContext(globalContext);
    const [query,setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e)=> {
        e.preventDefault();
        if(query?.length > 1){
            navigate(`/search/movie?query=${query}`);
        }
   };

    return (
    <form className={`back-color-${theme} search-form card`}>
        <input 
            className={`t-color-${theme}-2`}
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            type="search" 
            placeholder={languages[lang].searchPlaceholder}/>
        <button 
            className={`t-color-${theme} scale back-color-${theme}-2 link-hover  search-btn`}
            onClick={(e)=> handleSearch(e)}
            >
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

   const fetchImages = ()=>{
    setIsPending(true);
    setError(null);
       fetchData(`trending/movie/week?language=${lang}&page=1`)
       .then((data)=>{
           setImages(data?.results);
       })
       .catch(error=> {
            setError(error);
       })
       .finally(()=>{
          setIsPending(false);
       })
   }


   const imgIdex = Math.ceil(Math.random() * 20);

   useEffect(fetchImages,[lang]);


    return (
        <div 
            style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${images[imgIdex]?.backdrop_path})`}}
            className="search-bar" >
                {
                    isPending ? <Loading width='100%' height='400px' /> : 
                    images ?
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
                    :error && <Error error={error} height='400px' onClick={fetchImages} />
                }
        </div>
    );
};

export default SearchBar;