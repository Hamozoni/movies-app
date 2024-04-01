import { Outlet, useLocation, useParams } from "react-router-dom"

import MainMediaNav from '../Components/sharedComponents/mainMediaNav/MainMediaNav';
import MediaHeader from '../Components/sharedComponents/mediaHeader/MediaHeader';
import MediaColorContext from "../GlobalStateContext/MediaColorContext";
import { createContext, useContext, useEffect } from "react";
import Loading from "../Components/loading/Loading";
import Error from "../Components/error/Error";
import fetchData from "../utilities/fetchData";
import { useState } from "react";
import { globalContext } from "../GlobalStateContext/GlobalContext";

export const tvShowDetailsContext = createContext()

const TvShowsLayout = () => {

  const {id} = useParams();
  const {lang} = useContext(globalContext)

  const [details,setDetails] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);

  const lankUrl = `tv/${id}`;

  const fetchDetails = ()=> {
    setIsPending(true);
    setError(null);

    fetchData(`${lankUrl}?language=${lang}`)
    .then((data)=> {
      setDetails(data);
      document.title = data.name;
    })
    .catch(error=> {
      setError(error)
    })
    .finally(()=> {
      setIsPending(false);
    });
  };

  useEffect(fetchDetails,[id,lang,lankUrl]);

  const pathName = useLocation().pathname
  return (
    <main className="tv"> 
       <MediaColorContext>
        <tvShowDetailsContext.Provider value={{details}}>
            {
              isPending ? <Loading width='100%'  height='calc(100vh - 100px)'/> 
              : details ?
              <div className="tv-container">
                  <MainMediaNav 
                        linkUrl={lankUrl} 
                        overview={['titles','castCrew','episodeGroups','seasons','translations']} 
                        media={['backdrops','posters','logos']} 
                        isVideos={true}
                      />
                  {
                    !pathName.endsWith(id) && 
                    <MediaHeader 
                        imageUrl={details?.poster_path} 
                        title={details?.name}
                        navigateTo={`/tv/${id}`}
                        linkTitle={lang === 'ar' ?  'الرجوع للرئيسية' :'back to main'}
                        year={details.first_air_date}
                        /> 
                  }
                  <Outlet />
              </div>
              : error && <Error error={error}  height='calc(100vh - 100px)' onClick={fetchDetails}/>
            }

        </tvShowDetailsContext.Provider>
       </MediaColorContext>
    </main>
  )
}

export default TvShowsLayout