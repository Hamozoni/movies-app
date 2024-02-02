import { useEffect, useState } from "react"
import MainMediaNav from "../../Components/MainMediaNav/MainMediaNav"
import { useParams } from "react-router-dom";
import fetchData from "../../Utilities/fetchData";

const Transaction = () => {

  const {id} = useParams();
  const [translations,setTranslations] = useState();

  useEffect(()=>{
     fetchData(`movie/${id}/translations`)
     .then((data)=> {
          setTranslations(data?.translations)
     })

  },[id]);

  return (
    <main className="mov-transation">
        <header className="tran-header">
            <MainMediaNav />
        </header>
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

            </section>
        </div>
    </main>
  )
}

export default Transaction