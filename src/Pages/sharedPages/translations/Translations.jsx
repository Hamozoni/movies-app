import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import LockOpenIcon from '@mui/icons-material/LockOpen';

import "./Translations.scss";
import fetchData from "../../../utilities/fetchData";

const Transaction = ({mediaType}) => {

  const {id} = useParams();
  const [translations,setTranslations] = useState();

  useEffect(()=>{
     fetchData(`${mediaType}/${id}/translations`)
     .then((data)=> {
          setTranslations(data?.translations)
     })

  },[id]);

  return (
    <main className="mov-transation">
        <div className="alt-content">
            <section className="trans-langs alt-cout-list ">
                  <header className="lang-header cout-header">
                  <h3 >
                       Translations
                    </h3>
                    <p>{translations?.length}</p>
                  </header>
                  <ul className="cout-list">
                    {
                        translations?.map((trans)=> (
                            <li key={trans?.iso_3166_1}>
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