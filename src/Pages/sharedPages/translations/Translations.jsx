import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import LockOpenIcon from '@mui/icons-material/LockOpen';

import "./Translations.scss";
import fetchData from "../../../utilities/fetchData";
import { useContext } from "react";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";

const Transaction = ({mediaType,isSeason = false,isEpisode = false}) => {

  const {color} = useContext(mediaColorContext);

  const {id,seasonNumber,episodeNumber} = useParams();

  const [translations,setTranslations] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);

  const fetchTrans = ()=>{

    setIsPending(true);
    setError(null);

    let season = ''
    if(isSeason) {
      season = `/season/${seasonNumber}`
    }
    if(isEpisode){
      season = `/season/${seasonNumber}/episode/${episodeNumber}` 
     }
     fetchData(`${mediaType}/${id}${season}/translations`)
     .then((data)=> {
          setTranslations(data?.translations)
     })
     .catch((error)=> {
       setError(error)
     })
     .finally(()=> {
        setIsPending(false)
     })

  }

  useEffect(fetchTrans,[id]);

  return (
    <main className="mov-transation">
      {
        isPending ? <Loading width='100%' height='calc(100vh - 100px)' /> 
        : translations ?
        <div className="alt-content">
            <section className="trans-langs alt-cout-list card">
                  <header 
                    className="lang-header cout-header" 
                    style={{backgroundColor:color.backColor}}
                    >
                     <h3 style={{color: color.textColor}}>
                       Translations
                    </h3 >
                    <p style={{color: color.textColor}} >{translations?.length}</p>
                  </header>
                  <ul className="cout-list">
                    {
                        translations?.map((trans)=> (
                            <li key={trans?.iso_3166_1} className="nav-btn">
                              <a href={`#${trans?.iso_3166_1}`}>
                                 <h4>{trans?.english_name}</h4>
                                <span>{trans?.iso_639_1}-{trans?.iso_3166_1}</span>
                              </a>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className="trans-titles">
               {
                  translations?.map((trans)=> (
                    <div 
                        id={trans?.iso_3166_1}
                        key={trans?.iso_3166_1} 
                        className="trans-content-card">
                         <header className="trans-cont-head">
                               <h4 className="en-name">
                                   {trans?.english_name}
                               </h4>
                               <span>({trans?.iso_639_1}-{trans?.iso_3166_1})</span>
                         </header>
                         <div className="tr-ca-body">
                             <div className="">
                                 <h5>title</h5>
                                 <span>{trans?.data?.title}</span>
                                 <span><LockOpenIcon /></span>
                             </div>
                             <div className="">
                               <h5>Taglines</h5>
                               <span>{trans?.data?.tagline}</span>
                                <span><LockOpenIcon /></span>
                             </div>
                             <div className="">
                                <h5>Overview</h5>
                                <span>{trans?.data?.overview}</span>
                                <span><LockOpenIcon /></span>
                             </div>
                             <div className="">
                                <h5>{trans?.data?.runtime}</h5>
                                <span><LockOpenIcon /></span>
                                <a href={trans?.data?.homepage} target="_blank">
                                   {trans?.data?.homepage}
                                </a>
                                <span><LockOpenIcon /></span>
                             </div>
                         </div>
                    </div>
                  ))
               } 
            </section>
        </div>
        : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchTrans}  />
      }
    </main>
  )
}

export default Transaction