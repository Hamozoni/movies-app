
import {Outlet, useLocation, useParams} from 'react-router-dom'
import './MovieLayout.scss';
import MainMediaNav from '../../Components/sharedComponents/mainMediaNav/MainMediaNav';
import MediaHeader from '../../Components/sharedComponents/mediaHeader/MediaHeader';
import MediaColorContext from '../../GlobalStateContext/MediaColorContext';
import { createContext, useContext, useEffect, useState } from 'react';
import fetchData from '../../utilities/fetchData';
import Loading from '../../Components/loading/Loading';
import Error from '../../Components/error/Error';
import { globalContext } from '../../GlobalStateContext/GlobalContext';

export const MovieDetailsContext = createContext()

const MovieLayout = () => {

    const {id} = useParams();

    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const lankUrl = `movie/${id}`;

    const fetchDetails = ()=> {
      setIsPending(true);
      setError(null);

      fetchData(`${lankUrl}?language=${lang}`)
      .then((data)=> {
        setDetails(data);
        console.log(data);
      })
      .catch(error=> {
        setError(error)
      })
      .finally(()=> {
        setIsPending(false);
      });
    }

    useEffect(fetchDetails,[id,lang]);

    const pathName = useLocation().pathname


  return (
      <main className="movie">
        {
          isPending ?<Loading width='100%'  height='calc(100vh - 100px)'/> :
          details ?
         <MediaColorContext>
           <MovieDetailsContext.Provider value={{details}} >
            <MainMediaNav mediaType='movie' linkUrl={lankUrl} />
                {
                  !pathName.endsWith(id) &&
                  <MediaHeader 
                      imageUrl={details?.poster_path} 
                      title={details?.title}
                      navigateTo={`/movie/${id}`}
                      linkTitle={lang === 'ar' ?  'الرجوع للرئيسية' :'back to main'}
                      year={details.release_date}
                      /> 
                }
              <Outlet />
           </MovieDetailsContext.Provider>
         </MediaColorContext>
         :error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDetails}/>
        }
      </main>
  )
}

export default MovieLayout