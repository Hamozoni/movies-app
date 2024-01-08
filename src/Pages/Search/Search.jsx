import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { MovieCard } from "../Keywords/Keywords";

import "./search.scss";

const Search = ()=> {
    
    const {type} = useParams();
    const query = useLocation();

    console.log(query);

    const {lang} = useContext(globalContext);

    const [searchData,setSearchData] = useState({});
    const [page,setPage] = useState(1)

    useEffect(()=>{
        fetchData(`search/${type}${query.search}&include_adult=false&language=${lang}&page=${page}`)
        .then((data)=> {
            setSearchData(data);
            console.log(data)
        })

    },[type,lang,page]);

    const navigate = useNavigate();

    return (
        <main className="search">
            <div className="search-container">
                <section className="search-flters">
                    <header className="filter-header">
                        <h4>Search filter</h4>
                    </header>
                    <ul className="fliters-ul">
                        <li 
                            onClick={()=> navigate(`/search/movie${query?.search}`)}
                            className={type === 'movie' && 'active'}
                            >
                                movie 
                                <span>{new Intl.NumberFormat().format(searchData?.total_results)}</span>
                            </li>
                        <li 
                           onClick={()=> navigate(`/search/tv${query?.search}`)}
                           className={type === 'tv' && 'active'}
                           >
                              tv shows
                            </li>
                        <li 
                           onClick={()=> navigate(`/search/people${query?.search}`)}
                           className={type === 'people' && 'active'}
                           >
                            people
                        </li>
                        <li 
                           onClick={()=> navigate(`/search/collections${query?.search}`)}
                           className={type === 'collections' && 'active'}
                           >
                            collections
                        </li>
                        <li 
                           onClick={()=> navigate(`/search/keywords${query?.search}`)}
                           className={type === 'keywords' && 'active'}>keywords</li>
                        <li
                           onClick={()=> navigate(`/search/companies${query?.search}`)}
                           className={type === 'companies' && 'active'}
                           >
                            companies
                        </li>
                        <li 
                           onClick={()=> navigate(`/search/networks${query?.search}`)}
                           className={type === 'networks' && 'active'}
                           >
                            networks
                        </li>
                    </ul>

                </section>
                <section className="search-resulte">
                    {
                        searchData?.results?.map((media)=> (
                            <MovieCard movie={media} />
                        ))
                    }

                    <div className="next-page">
                        <ul className="next">
                            {
                                page > 1 &&
                                <li onClick={()=> setPage(page - 1)}>prev</li>
                            }
                               <li className="active" onClick={()=> setPage(page)}>{page}</li>
                            {
                                searchData?.total_pages > 6 &&
                                <>
                                    <li 
                                        onClick={()=> setPage(page + 1)}
                                        >
                                            {page + 1}
                                        </li>
                                    <li onClick={()=> setPage(page + 2)}>{page + 2}</li>
                                    <li onClick={()=> setPage(page + 3)}>{page + 3}</li>
                                    <li onClick={()=> setPage(page + 4)}>{page + 4}</li>
                                    <li onClick={()=> setPage(page + 5)}>{page + 5}</li>
                                </>
                            }
                            <li onClick={()=> setPage(searchData?.total_pages)}>{searchData?.total_pages}</li>
                            {
                                page < searchData?.total_pages &&
                                <li onClick={()=> setPage(page + 1)}>next</li>
                            }
                        </ul>
                    </div>

                </section>

            </div>
        </main>
    );
};

export default Search;