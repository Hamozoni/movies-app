import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData"
import { globalContext } from "../../GlobalStateContext/GlobalContext"

import "./Recommendations.scss";

function Recommendations({id,mediaType}) {

    const {lang} = useContext(globalContext);
    const [recomData,setRecomData] = useState([])

    useEffect(()=>{
        fetchData(`${mediaType}/${id}/recommendations?language=${lang}&page=1`)
        .then((data)=> {
            setRecomData(data);
           console.log(data)
        })
    },[id,lang])

  return (
    <section className="recommendations">
        <h4 className="recom-t">Recommendations</h4>
        <div className="recom-content">
            {
                recomData?.results?.map((media)=>(
                    <div className="media-card">
                        <div className="image">
                            <img src={process.env.REACT_APP_BASE_URL + "w300" + media?.poster_path} alt="" />
                        </div>
                        <div className="media-content">
                            <h4 className="name">
                                {media?.name || media?.title}
                            </h4>
                            <span>
                                {media?.vote_average?.toFixed(1)?.toString()?.replace(".","")}%
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Recommendations