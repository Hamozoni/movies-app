import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData"
import { globalContext } from "../../GlobalStateContext/GlobalContext"

import "./Recommendations.scss";
import fitLongString from "../../Utilities/fitLongString";

function Recommendations({id,mediaType}) {

    const {lang} = useContext(globalContext);
    const [recomData,setRecomData] = useState([])

    useEffect(()=>{
        fetchData(`${mediaType}/${id}/recommendations?language=${lang}&page=1`)
        .then((data)=> {
            setRecomData(data);
           console.log(data)
        })
    },[id,lang]);


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
                            <p className="name">
                                {fitLongString(media?.name,38) || fitLongString(media?.title,38) }
                            </p>
                            <h4>
                                {media?.vote_average?.toFixed(1)?.toString()?.replace(".","")}%
                            </h4>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Recommendations