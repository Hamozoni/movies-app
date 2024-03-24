import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext";

import "../../Components/sharedComponents/mainMediaNav/MainmediaNav.scss";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { createContext, useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import Loading from "../../Components/loading/Loading";
import MediaHeader from "../../Components/sharedComponents/mediaHeader/MediaHeader";
import Error from "../../Components/error/Error";

export const collectionContext = createContext()

const CollectionLayout = () => {
    const {id} = useParams();
    const {innerWidth,color} = useContext(globalContext)
    const  navLink  = `/collection/${id}`;

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDetails = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`collection/${id}?language=en-US`)
        .then((data)=> {
            setDetails(data);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        });
    }

    useEffect(fetchDetails,[id])

    const arrowIcon = innerWidth > 460 &&  <span className='icon'><ArrowDropDownIcon /></span>;

    const mainNav =  <nav className='media-header'>
                <div className='media-nav'>
                    <div className='med-title'>
                        <span>overview</span>
                        {arrowIcon}
                        <ul className='links-list'>
                            <li 
                                className='nav-btn' 
                                >
                                    <Link to={navLink}>main</Link>
                            </li>
                            <li className='nav-btn'>
                                <Link to={`${navLink}/translations`}>
                                    translations
                                </Link>
                            </li>
                            <li className='nav-btn'>
                                <Link to={`${navLink}/changes`}>
                                    changes
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='med-title'>
                        <span>media</span>
                        {arrowIcon}
                        <ul className='links-list'>
                            <li className='nav-btn'>
                                <Link to={`${navLink}/backdrops`} >
                                    backdrops
                                    {/* <span>{mediaData?.length}</span> */}
                            </Link>
                            </li >
                            <li className='nav-btn'>
                                <Link to={`${navLink}/posters`} >
                                    posters
                                    {/* <span>{mediaData?.length}</span> */}
                            </Link>
                            </li >
                        </ul>
                    </div>
                    <div className='med-title'>
                        <span> fandom</span>
                        {arrowIcon}
                        <ul className='links-list'>
                            <li className='nav-btn'><Link>discussions</Link></li>
                        </ul>
                    </div>
                    <div className='med-title'>
                        <span> share</span>
                        {arrowIcon}
                        <ul className={`${innerWidth < 560 && 'last'} links-list`}>
                            <li className='nav-btn'><Link>share link</Link></li>
                            <li className='nav-btn'><Link>facebook</Link></li>
                            <li className='nav-btn'><Link>tweet</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

    const pathName = useLocation().pathname


  return (
    <MediaColorContext>
        <collectionContext.Provider value={{details}}>
            <div className="collection-Layout">
                {mainNav}
                {  !pathName?.endsWith(id) &&(
                    isPending ? <Loading width='100%' height='200px' /> :
                    details ? 
                    <MediaHeader 
                        imageUrl={details?.poster_path} 
                        title={details?.name}
                        navigateTo={`/collection/${id}`}
                        linkTitle='back to main'
                        /> 
                    : error && <Error error={error} height='200px' onClick={fetchDetails}/>)
                }
                <Outlet />
            </div>
        </collectionContext.Provider>
    </MediaColorContext>
  )
}

export default CollectionLayout