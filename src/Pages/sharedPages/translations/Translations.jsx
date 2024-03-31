import { useEffect, useState } from "react"
import { useLocation} from "react-router-dom";

import LockOpenIcon from '@mui/icons-material/LockOpen';

import "./Translations.scss";
import fetchData from "../../../utilities/fetchData";
import { useContext } from "react";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";
import { languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

const Transaction = () => {

  const {color} = useContext(mediaColorContext);
  const {lang,theme} = useContext(globalContext);

  const [translations,setTranslations] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);

  const pathName = useLocation().pathname;

  const fetchTrans = ()=>{

    setIsPending(true);
    setError(null);

     fetchData(pathName)
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

  useEffect(fetchTrans,[pathName]);

  const isEnglish = lang === 'en';

  return (
        isPending ? <Loading width='100%' height='calc(100vh - 100px)' /> 
        : translations ?
        <div className="alt-content">
            <section className={`back-color-${theme}-1 trans-langs alt-cout-list card`}>
                  <header 
                    className="lang-header cout-header" 
                    style={{backgroundColor:color.backColor}}
                    >
                     <h3 style={{color: color.textColor}}>
                       {languages[lang].translations}
                    </h3 >
                    <p style={{color: color.textColor}} >{translations?.length}</p>
                  </header>
                  <ul className="cout-list">
                    {
                        translations?.map((trans)=> (
                            <li 
                                key={trans?.iso_3166_1} 
                                className="nav-btn"
                                >
                                <a 
                                  className={`t-color-${theme}-1`}
                                  href={`#${trans?.iso_3166_1}`}
                                  >
                                  <h4 className="h-t">{trans?.english_name}</h4>
                                  <span className={`t-color-${theme}-4 h-t-s`}>
                                      {trans?.iso_639_1}-{trans?.iso_3166_1}
                                  </span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className="alt-t-tabels">
               {
                  translations?.map((trans)=> (
                    <div 
                        id={trans?.iso_3166_1}
                        key={trans?.iso_3166_1} 
                        className="titles-card trans-content-card card">
                         <header 
                              className={`back-color-${theme}-1 t-color-${theme} trans-cont-head t-h`}
                              >
                               <h4 className="t-name">
                                   {trans?.english_name + " "}
                                  <span className={`t-color-${theme}-3 t-sp`}>
                                     ({trans?.iso_639_1}-{trans?.iso_3166_1})
                                  </span>
                               </h4>
                         </header>
                         <div className="tr-ca-body tbody">
                             <div className={`t-color-${theme}-1 t-part b-b`}>
                                 <h5 className="title">
                                    {isEnglish ? 'title' : 'العنوان'}
                                 </h5>
                                 <div className="t-info">
                                    <span className="desc">
                                          {trans.data.title || '___'}
                                      </span>
                                    <span className={`t-color-${theme}-5`}>
                                        <LockOpenIcon />
                                    </span>
                                 </div>
                             </div>
                             <div className={`t-color-${theme}-2  t-part b-b`}>
                               <h5  className="title">{isEnglish ?'Taglines' : 'علامة'}</h5>
                                <div className="t-info">
                                    <span className="desc">{trans.data.tagline || '___'}</span>
                                    <span className={`t-color-${theme}-4`}>
                                       <LockOpenIcon />
                                    </span>
                                </div>
                             </div>
                             <div className={`t-color-${theme}-2  t-part b-b`}>
                                <h5  className="title">{isEnglish ? 'Overview' : 'نظرة'}</h5>
                                <div className="t-info">
                                  <span className="desc">{trans.data.overview || '___'}</span>
                                  <span className={`t-color-${theme}-5`}>
                                      <LockOpenIcon />
                                  </span>
                                </div>
                             </div>
                             <div className={`t-color-${theme}-2  t-part`}>
                                <div className="t-titles">
                                    <h5>{Math.floor(trans.data.runtime / 60) + 'h' + " " +  Math.floor(trans.data.runtime % 60) + 'm' || '___'}</h5>
                                    <span className={`t-color-${theme}-4`}>
                                       <LockOpenIcon  />
                                    </span>
                                </div>
                                <div className="t-info">
                                    <a 
                                      className={`t-color-${theme}-4 link-hover desc`}
                                      href={trans.data.homepage || '___'} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      >
                                      {trans.data.homepage || '___'}
                                    </a>
                                    <span className={`t-color-${theme}-5`}>
                                          <LockOpenIcon />
                                    </span>
                                </div>
                             </div>
                         </div>
                    </div>
                  ))
               } 
            </section>
        </div>
        : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchTrans}  />
  )
}

export default Transaction