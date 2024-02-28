import { useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';


const LatestTrailer = () => {
    const [trailerData,setTrailerData] = useState([]);

    useEffect(()=>{
        fetchData(`movie/popular?language=en-US&page=1`)
        .then((data)=> {
            setTrailerData(data?.results);
            console.log(data.results)
        })
    },[]);

  return (
    
    <section className="latest-trailer">
        <header className="trailer-header">
            <h3>latest trailer</h3>
            <nav className="trailer-nav">
                <ul className="trailer-ul">
                    <li>popular</li>
                    <li>streaming</li>
                    <li>on tv</li>
                    <li>for rent</li>
                    <li>in theatres</li>
                </ul>
            </nav>
            <div className="trailer-content">
                <div className="trailer-container">
                    {
                        trailerData?.map((media)=>(
                            <div  key={media?.id} className="trailer-media">
                                <div className="trailer-image">
                                    <img 
                                        loading="lazy"
                                        src={process.env.REACT_APP_BASE_URL + 'original' + media?.poster_path} 
                                        alt={media?.title} 
                                        />
                                    <div className="more-info">
                                        <span><MoreHorizRoundedIcon /></span>
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

        </header>

    </section>
  )
}

export default LatestTrailer