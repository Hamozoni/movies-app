import { Outlet, useLocation, useParams } from "react-router-dom"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext";

import { createContext, useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import Loading from "../../Components/loading/Loading";
import MediaHeader from "../../Components/sharedComponents/mediaHeader/MediaHeader";
import Error from "../../Components/error/Error";
import MainMediaNav from "../../Components/sharedComponents/mainMediaNav/MainMediaNav";

export const collectionContext = createContext()

const CollectionLayout = () => {
    const {id} = useParams();
    const {lang} = useContext(globalContext)
    const  collecUrl  = `/collection/${id}`;

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDetails = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`collection/${id}?language=${lang}`)
        .then((data)=> {
            setDetails(data);
            document.title = data.name;
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        });
    }

    useEffect(fetchDetails,[id,lang])

    const pathName = useLocation().pathname


  return (
    <MediaColorContext>
        <collectionContext.Provider value={{details}}>
            <div className="collection-Layout">
                <MainMediaNav 
                    mediaType='collection'  
                    linkUrl={collecUrl} 
                    overview={['translations']} 
                    media={['backdrops','posters']} 
                    />

                {  !pathName?.endsWith(id) &&(
                    isPending ? <Loading width='100%' height='200px' /> :
                    details ? 
                    <MediaHeader 
                        imageUrl={details?.poster_path} 
                        title={details?.name}
                        navigateTo={collecUrl}
                        linkTitle={lang === 'ar' ?  'الرجوع للرئيسية' :'back to main'}
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