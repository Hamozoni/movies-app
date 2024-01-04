import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";


const TvShowSeasons = () => {

    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [seasons,setSeasons] = useState();


    useEffect(()=>{

        fetchData(`tv/${id}?language=${lang}`)
        .then((data)=>{
            setSeasons(data)
        })

    },[id,lang]);


  return (
    <main className="tv-seasons">
        <div className="tv-s-container">
            <header className="seasons-header">
                <div className="tv-details">
                    <div className="tv-image">

                    </div>
                    <div className="tv-details">
                        <h3 className="name"></h3>
                        <Link></Link>
                    </div>
                </div>
            </header>

        </div>
    </main>
  )
}

export default TvShowSeasons