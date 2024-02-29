import { useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import "./LatestTrailer.scss";


const LatestTrailer = () => {
    const [trailerData,setTrailerData] = useState([]);
    const [activeSection,setActiveSection] = useState('popular');
    const [backgroundImageIndex,setBackgroundImageIndex] = useState(0);

    useEffect(()=>{
        fetchData(`movie/popular?language=en-US&page=1`)
        .then((data)=> {
            setTrailerData(data?.results);
            console.log(data.results)
        })
    },[]);

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
        <header className="trailer-header">
            <h3>latest trailer</h3>
            <nav className="trailer-nav">
                <ul className="trailer-ul">
                    <li className={activeSection === 'popular' && 'active'}>popular</li>
                    <li>streaming</li>
                    <li>on tv</li>
                    <li>for rent</li>
                    <li>in theatres</li>
                </ul>
            </nav>
            </header>
            <div className="trailer-content">
                <div className="trailer-container">
                    {
                        trailerData?.map((media,i)=>(
                            <div  
                                onMouseEnter={()=> setBackgroundImageIndex(i)}
                                key={media?.id} 
                                className="trailer-media">
                                <div className="trailer-image">
                                    <img 
                                        loading="lazy"
                                        src={process.env.REACT_APP_BASE_URL + 'original' + media?.backdrop_path} 
                                        alt={media?.title} 
                                        />
                                    <div className="more-info">
                                       <MoreHorizRoundedIcon />
                                    </div>
                                    <span className="pay-trailer">
                                        <PlayArrowRoundedIcon />
                                    </span>
                                </div>
                                <div className="trailer-titles">
                                    <h3 className="name">
                                        {media?.title}
                                    </h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>



    </section>
  )
}

export default LatestTrailer