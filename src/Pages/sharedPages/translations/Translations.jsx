import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import LockOpenIcon from '@mui/icons-material/LockOpen';

import "./Translations.scss";
import fetchData from "../../../utilities/fetchData";
import { useContext } from "react";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";

const Transaction = ({mediaType,isSeason = false}) => {

  const {color} = useContext(mediaColorContext);

  const {id,seasonNumber} = useParams();
  const [translations,setTranslations] = useState();

  useEffect(()=>{
    let season = ''
    if(isSeason) {
      season = `/season/${seasonNumber}`
    }
     fetchData(`${mediaType}/${id}${season}/translations`)
     .then((data)=> {
          setTranslations(data?.translations)
     })

  },[id]);

  return (
    <main className="mov-transation">
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
                                 <h4>{trans?.english_name}</h4>
                                <span>{trans?.iso_639_1}-{trans?.iso_3166_1}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className="trans-titles">
               {
                  translations?.map((trans)=> (
                    <div key={trans?.iso_3166_1} className="trans-content-card">
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
    </main>
  )
}

export default Transaction