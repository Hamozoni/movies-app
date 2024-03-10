import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import { MovieCard } from "../keywords/Keywords";

import "./search.scss";
import PersonCard from "../../Components/PersonCard/PersonCard";
import PageNumber from "../../Components/PageNumber/PageNumber";

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

    const handleFilter = (type)=> {

        navigate(`/search/${type}${query?.search}`)
        setPage(1);
    };

    return (
        <main className="search">
            <div className="search-container">
                <section className="search-flters">
                    <header className="filter-header">
                        <h4>Search filter</h4>
                    </header>
                    <ul className="fliters-ul">
                        <li 
                            onClick={()=> handleFilter('movie')}
                            className={type === 'movie' && 'active'}
                            >
                                movie 
                                {
                                    type === 'movie' &&
                                    <span>
                                        {new Intl.NumberFormat().format(searchData?.total_results)}
                                     </span>
                                }
                            </li>
                        <li 
                           onClick={()=> handleFilter('tv')}
                           className={type === 'tv' && 'active'}
                           >
                              tv shows
                              {
                                    type === 'tv' &&
                                    <span>
                                        {new Intl.NumberFormat().format(searchData?.total_results)}
                                        </span>
                                }
                            </li>
                        <li 
                           onClick={()=> handleFilter('person')}
                           className={type === 'person' && 'active'}
                           >
                            people
                            {
                                type === 'person' &&
                                <span>
                                    {new Intl.NumberFormat().format(searchData?.total_results)}
                                    </span>
                            }
                        </li>
                        <li 
                           onClick={()=> handleFilter('collection')}
                           className={type === 'collection' && 'active'}
                           >
                            collections
                            {
                                type === 'collection' &&
                                <span>
                                    {new Intl.NumberFormat().format(searchData?.total_results)}
                                </span>
                            }
                        </li>
                        <li 
                           onClick={()=> handleFilter('keyword')}
                           className={type === 'keyword' && 'active'}>
                            keywords
                            {
                                type === 'keyword' &&
                                <span>
                                    {new Intl.NumberFormat().format(searchData?.total_results)}
                                    </span>
                            }
                            </li>
                        <li
                           onClick={()=> handleFilter('company')}
                           className={type === 'company' && 'active'}
                           >
                            companies
                            {
                                type === 'company' &&
                                <span>
                                    {new Intl.NumberFormat().format(searchData?.total_results)}
                                    </span>
                            }
                        </li>
                    </ul>

                </section>
                <section className="search-resulte">
                    {

                        
                        searchData?.results?.map((media)=> (
                            type === 'person' ? 

                            <PersonCard key={media?.id} person={media} />
                            :
                            <MovieCard key={media?.id} movie={media} />
                        ))
                    }
                    <PageNumber page={page} setPage={setPage} totalPages={searchData?.total_pages}/>
                </section>

            </div>
        </main>
    );
};

export default Search;