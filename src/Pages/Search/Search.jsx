import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";


import "./search.scss";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import PageNumber from "../../Components/sharedComponents/pageNumber/PageNumber";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";
import MediaInlineCard from "../../Components/sharedComponents/mediaInlineCard/MediaInlineCard";
import CrewCard from "../../Components/sharedComponents/crewCard/CrewCard";
import { languages } from "../../utilities/languages";


const Search = ()=> {
    
    const {type} = useParams();
    const query = useLocation();

    const {lang} = useContext(globalContext);

    const [searchData,setSearchData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const [page,setPage] = useState(1);

    const fetchSeachData = ()=>{

        document.title = query.search.split('=')[1] + '__' + type;
        setIsPending(true);
        setError(null);
        fetchData(`search/${type}${query.search}&include_adult=false&language=${lang}&page=${page}`)
        .then((data)=> {
            setSearchData(data);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=>{
            setIsPending(false);

        })

    }

    useEffect(fetchSeachData,[type,lang,page,query.search]);

    const navigate = useNavigate();

    const handleFilter = (type)=> {
        navigate(`/search/${type}${query?.search}`)
        setPage(1);
    };

    return (
        <main className="search alt-titles">
            <div className="search-container alt-content">
                <section className="search-flters alt-cout-list">
                    <header className="filter-header cout-header">
                        <h4 className="fil-t">{languages[lang].searchFilter}</h4>
                    </header>
                    <ul className="fliters-ul cout-list">
                        <li 
                            onClick={()=> handleFilter('movie')}
                            className={`${type === 'movie' && 'active'} nav-btn`}
                            >
                                {languages[lang].movies}
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
                              {languages[lang].tvShows}
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
                            {languages[lang].people}
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
                            {languages[lang].collections}
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
                           {languages[lang].keywords}
                            {
                                type === 'keyword' &&
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
                    <section className="search-results alt-t-tabels">
                        {
                            
                            searchData?.results?.map((media)=> (
                                type === 'person' ? 

                                <CrewCard key={media?.id} person={media} />
                                : type === 'keyword' ? 
                                <div className="key-l">
                                    <Link key={media?.id} to={`/keywords/${media?.id}`} className="keyword-link link-hover" >
                                        {media?.name}
                                    </Link>
                                </div>
                                :
                                <MediaInlineCard key={media?.id} movie={media} type={type}/>
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