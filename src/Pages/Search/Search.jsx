import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { MovieCard } from "../Keywords/Keywords";

const Search = ()=> {
    
    const {type} = useParams();
    const query = useLocation();

    console.log(query);

    const {lang} = useContext(globalContext);

    const [searchData,setSearchData] = useState({});

    useEffect(()=>{
        fetchData(`search/${type}${query.search}&include_adult=false&language=${lang}&page=1`)
        .then((data)=> {
            setSearchData(data);
            console.log(data)
        })

    },[type,lang]);

    return (
        <main className="search">
            <div className="search-container">
                <section className="search-flters">
                    <header className="filter-header">

                    </header>
                    <ul className="fliters-ul">
                        <li>movie</li>
                        <li>tv shows</li>
                        <li>people</li>
                        <li>collections</li>
                        <li>keywords</li>
                        <li>companies</li>
                        <li>networks</li>
                    </ul>

                </section>
                <section className="search-resulte">
                    {
                        searchData?.results?.map((media)=> (
                            <MovieCard movie={media} />
                        ))
                    }

                </section>

            </div>
        </main>
    );
};

export default Search;