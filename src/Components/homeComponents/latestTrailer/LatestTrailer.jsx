import {useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";


import "./LatestTrailer.scss";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import LatesTrailerVideoCard from "./LatesTrailerVideoCard";


const LatestTrailer = () => {

    const [trailerData,setTrailerData] = useState([]);
    const [activeSection,setActiveSection] = useState('popular');
    const [backgroundImageIndex,setBackgroundImageIndex] = useState(0);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);



    // const navigate = useNavigate();

    const fecth = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`movie/${activeSection}?language=en-US&page=1`)
        .then((data)=> {
            setTrailerData(data?.results);
            setIsPending(false);
            console.log(data?.results);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });
    }

    useEffect(fecth,[activeSection]);


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
                <h3>latest trailer</h3>
                    <nav className="trailer-nav">
                        <ul className="trailer-ul">
                            <li 
                                className={activeSection === 'popular' && 'active'}
                                onClick={()=> setActiveSection('popular')}
                                >popular
                            </li>
                            <li 
                                className={activeSection === '' && 'active'}
                                onClick={()=> setActiveSection('')}
                                >streaming
                            </li>
                            <li 
                                className={activeSection === 'on_the_air' && 'active'}
                                onClick={()=> setActiveSection('on_the_air')}
                                >on tv
                            </li>
                            <li onClick={()=> setActiveSection('')}>for rent</li>
                            <li onClick={()=> setActiveSection('')}>in theatres</li>
                        </ul>
                    </nav>
                </header>
                <div className="trailer-content">
                    <div className="trailer-container">
                        {
                            isPending ? <Loading width='100%' height='330px'/> : 
                            trailerData?.length ?
                            trailerData?.map((detail,i)=> (
                            <LatesTrailerVideoCard detail={detail} onMouse={()=> setBackgroundImageIndex(i)}/>
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