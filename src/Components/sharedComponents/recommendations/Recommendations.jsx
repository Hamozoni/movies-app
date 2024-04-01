import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Recommendations.scss";

import EventNoteIcon from '@mui/icons-material/EventNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheatersIcon from '@mui/icons-material/Theaters';
import StarRateIcon from '@mui/icons-material/StarRate';

import fetchData from "../../../utilities/fetchData";
import fitLongString from "../../../utilities/fitLongString";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { languages } from "../../../utilities/languages";

import Loading from "../../loading/Loading";
import Error from "../../error/Error";

import noDataFound from "../../../assets/NewImage.png";

function Recommendations({id,mediaType}) {

    const {lang,theme} = useContext(globalContext);
    
    const [recomData,setRecomData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [selected,setSelected] = useState('recommendations')
    const [error,setError] = useState(null);

    const fetch = ()=>{
        setError(null);
        setIsPending(true);
        fetchData(`${mediaType}/${id}/${selected}?language=${lang}&page=1`)
        .then((data)=> {
            setRecomData(data);
        })
        .catch(error=> {
            setError(error);
        }).finally(()=> {
            setIsPending(false);
        })
    };

    useEffect(fetch,[id,lang,selected,mediaType]);

    const RecommendationCard = ({media}) => {
        return (
            <div className="recomm-media-card scale">
                <div className="recomm-image">
                    <img 
                        className="image-hover"
                        onClick={()=> handleNavigate(media)}
                        src={process.env.REACT_APP_BASE_URL + "w300" + media?.backdrop_path} 
                        alt="" />
                    <OnHoherOverlay media={media}/>
                </div>
                <div className="media-content">
                    <h4 
                        className={`name t-color-${theme}`} 
                        onClick={()=> handleNavigate(media)}
                        >
                        {fitLongString(media?.name,25) || fitLongString(media?.title,25) }
                    </h4>
                    <h5  className={`vote-per t-color-${theme}-3`} >
                        {media?.vote_average?.toFixed(1)?.toString()?.replace(".","")}%
                    </h5>
                </div>
            </div>
        )
    }


    const OnHoherOverlay = ({media})=> {
        return (
            <div className={`overlay-content back-color-${theme} t-color-${theme}`}>
                <div className="over-date">
                    <EventNoteIcon />
                    <span>{media?.release_date || media?.first_air_date}</span>
                </div>
                <ul className="add-to">
                    <li><FavoriteIcon /></li>
                    <li><TheatersIcon /></li>
                    <li><StarRateIcon /></li>
                </ul>
            </div>
        )
    };

    const navigate = useNavigate()

    const handleNavigate = (media)=> {
        navigate(`/${media.title ? 'movie' : 'tv' }/${media.id}`)
    }


  return (


    <section className="recommendations b-b">
        <ul className="select-ul">
            <li 
                onClick={()=> setSelected('recommendations')}
                className={`${selected === 'recommendations' && 'active'} t-color-${theme}-1 nav-btn`}
                >
                    {languages[lang].Recommendations}
            </li>
            <li 
                onClick={()=> setSelected('similar')}
                className={`${selected === 'similar' && 'active'} nav-btn t-color-${theme}-1`}
                >
                    {languages[lang].similar}
            </li>
        </ul>
        <div className="recom-content">
            {
             isPending ? <Loading width='100%' height='240px'/> 
             : recomData?.results.length === 0 ?  
             <img src={noDataFound} alt="no data found" className="no-data-img"/>
            :  recomData?.results.length > 0 ?
                recomData?.results?.map((media)=>(
                      <RecommendationCard key={media.id} media={media}/>
                ))
                : error && <Error error={error} height='240px' onClick={fetch}/>
            }
        </div>
    </section>

  )
}

export default Recommendations