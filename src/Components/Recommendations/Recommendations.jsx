import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData"
import { globalContext } from "../../GlobalStateContext/GlobalContext"

import "./Recommendations.scss";
import fitLongString from "../../Utilities/fitLongString";

import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import StarRateIcon from '@mui/icons-material/StarRate';

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

    const OnHoherOverlay = ({recomData})=> {
        return (
            <div className="overlay-content">
                <div className="over-date">
                    <EventNoteIcon />
                    <span>{recomData?.first_air_date || recomData?.release_date}</span>
                </div>
                <ul className="add-to">
                    <li><FavoriteIcon /></li>
                    <li><TheatersIcon /></li>
                    <li><StarRateIcon /></li>
                </ul>
            </div>
        )
    }


  return (
    <section className="recommendations">
        <h4 className="recom-t">Recommendations</h4>
        <div className="recom-content">
            {
                recomData?.results?.map((media)=>(
                    <div className="media-card">
                        <div className="image">
                            <img src={process.env.REACT_APP_BASE_URL + "w300" + media?.poster_path} alt="" />
                            <OnHoherOverlay recomData={recomData}/>
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