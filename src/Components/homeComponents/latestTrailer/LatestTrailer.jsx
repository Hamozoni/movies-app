import {useContext, useEffect, useState } from "react";

import fetchData from "../../../utilities/fetchData";


import "./LatestTrailer.scss";

import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import LatesTrailerVideoCard from "./LatesTrailerVideoCard";

import { languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";


const LatestTrailer = () => {

    const [trailerData,setTrailerData] = useState([]);
    const [activeSection,setActiveSection] = useState('popular');
    const [backgroundImageIndex,setBackgroundImageIndex] = useState(0);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const {lang,theme} = useContext(globalContext);


    const fecth = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`movie/${activeSection}?language=${lang}&page=1`)
        .then((data)=> {
            setTrailerData(data?.results);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false)
        })
    }

    useEffect(fecth,[activeSection,lang]);


    const style = {
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL + 'original' + trailerData[backgroundImageIndex]?.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize:'cover',
    };


  return (

    
    <section 
        className="latest-trailer" 
        style={style}
        >
            <div className="trailer-box-cotainer">
               <header className="trailer-header">
                <h3 className={`t-color-${theme}`}>{languages[lang].latestTrailer}</h3>
                    <nav className="trailer-nav">
                        <ul className="trailer-ul">
                            <li 
                                className={activeSection === 'popular' && 'active'}
                                onClick={()=> setActiveSection('popular')}
                                >{languages[lang].popular}
                            </li>
                            <li 
                                className={activeSection === 'now_playing' && 'active'}
                                onClick={()=> setActiveSection('now_playing')}
                                >{languages[lang].streaming}
                            </li>
                            <li 
                                className={activeSection === 'upcoming' && 'active'}
                                onClick={()=> setActiveSection('upcoming')}
                                >{languages[lang].onTv}
                            </li>
                            <li onClick={()=> setActiveSection('')}>{languages[lang].forRent}</li>
                            <li onClick={()=> setActiveSection('')}>{languages[lang].inTheatres}</li>
                        </ul>
                    </nav>
                </header>
                <div className="trailer-content">
                    <div className="trailer-container">
                        {
                            isPending ? <Loading width='100%' height='330px'/> : 
                            trailerData.length > 0 ?
                            trailerData?.map((detail,i)=> (
                            <LatesTrailerVideoCard 
                                detail={detail} 
                                onMouse={()=> setBackgroundImageIndex(i)}
                                />
                            ))
                            :
                            error && <Error error={error} height='330px' onClick={fecth} /> 
                        }
                        
                    </div>
                </div>

            </div>
    </section>
  )
}

export default LatestTrailer