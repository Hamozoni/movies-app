import { createContext, useContext, useEffect, useState } from "react"
import MediaColorContext from "../../GlobalStateContext/MediaColorContext";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../utilities/fetchData";
import Loading from "../../Components/loading/Loading";
import Error from "../../Components/error/Error";
import MainMediaNav from "../../Components/sharedComponents/mainMediaNav/MainMediaNav";
import MediaHeader from "../../Components/sharedComponents/mediaHeader/MediaHeader";

export const personDetailsContext = createContext();

const PersonLayout = () => {

  const [details,setDetails] = useState(null);
  const [error,setError] = useState(null);
  const [isPending,setIsPending] = useState(true);

  const {id} = useParams();
  const {lang} = useContext(globalContext);



  const fetchDetails = ()=> {
      setIsPending(true);
      setError(null);
      fetchData(`person/${id}?language=${lang}`)
      .then( data => {
          setDetails(data);
          document.title = data.name;
      })
      .catch(error=> {
          setError(error);
      })
      .finally(()=> {
          setIsPending(false);
      })
  }

  useEffect(fetchDetails,[id,lang]);

  const pathname = useLocation().pathname;
  const lankUrl = `person/${id}`;

  return (
     <main>
      {
        isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> :
        details ?
        <MediaColorContext>
          <personDetailsContext.Provider value={{details}} >
            <MainMediaNav 
                linkUrl={lankUrl}
                overview={['translations']} 
                media={['profiles']} 
              />
            {
              !pathname.endsWith(id) && 
              <MediaHeader 
                  imageUrl={details?.profile_path} 
                  title={details?.name}
                  navigateTo={`/person/${id}`}
                  linkTitle={lang === 'ar' ?  'الرجوع للرئيسية' :'back to main'}
                  year={details.release_date}
                  /> 
            }
            <Outlet />
          </personDetailsContext.Provider>
        </MediaColorContext>
        : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDetails}/>
      }
     </main>
  )
}

export default PersonLayout