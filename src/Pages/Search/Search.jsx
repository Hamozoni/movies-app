import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


import "./search.scss";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import PersonCard from "../../Components/personComponents/PersonCard/PersonCard";
import PageNumber from "../../Components/sharedComponents/pageNumber/PageNumber";
import MediaCard from "../../Components/sharedComponents/mediaCard/MediaCard";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";


const Search = ()=> {
    
    const {type} = useParams();
    const query = useLocation();

    const {lang} = useContext(globalContext);

    const [searchData,setSearchData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const [page,setPage] = useState(1);

    const fetchSeachData = ()=>{
        document.title = query.search.split('=')[1] + ' ' + type;
        setIsPending(true);
        setError(null);
        fetchData(`search/${type}${query.search}&include_adult=false&language=${lang}&page=${page}`)
        .then((data)=> {
            setSearchData(data);
            setIsPending(false);
            console.log(data)
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        })

    }

    useEffect(fetchSeachData,[type,lang,page]);

    const navigate = useNavigate();

    const handleFilter = (type)=> {
        navigate(`/search/${type}${query?.search}`)
        setPage(1);
    };

    return (
        <main className="search">
            <div className="search-container">
                <section className="search-flters card">
                    <header className="filter-header">
                        <h4>Search filter</h4>
                    </header>
                    <ul className="fliters-ul">
                        <li 
                            onClick={()=> handleFilter('movie')}
                            className={`${type === 'movie' && 'active'} nav-btn`}
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
                           className={`${type === 'tv' && 'active'} nav-btn`}
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
                           className={`${type === 'person' && 'active'} nav-btn`}
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
                           className={`${type === 'collection' && 'active'} nav-btn`}
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
                            className={`${type === 'keyword' && 'active'} nav-btn`} 
                            >
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
                           className={`${type === 'company' && 'active'} nav-btn`}
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
                {
                    isPending ? <Loading width='60%' height='calc(100vh - 100px)'/> : 
                    searchData ?
                    <section className="search-resulte">
                        {

                            searchData?.results?.map((media)=> (
                                type === 'person' ? 

                                <PersonCard key={media?.id} person={media} />
                                :
                                <MediaCard key={media?.id} movie={media} />
                            ))
                        }
                        <PageNumber page={page} setPage={setPage} totalPages={searchData?.total_pages}/>
                    </section>
                    : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchSeachData} />
                }

            </div>
        </main>
    );
};

export default Search;