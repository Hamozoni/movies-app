import { useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";


const LatestTrailer = () => {
    const [trailerData,setTrailerData] = useState([]);

    useEffect(()=>{
        fetchData(`movie/popular?language=en-US&page=1`)
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

                </div>
            </div>

        </header>

    </section>
  )
}

export default LatestTrailer