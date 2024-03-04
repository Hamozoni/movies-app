import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";

import "./MovieMedia.scss";
import { Link } from "react-router-dom";


const MovieMedia = ({id,mediaType})=> {

    const [mediaVed,setMediaVed] = useState([]);
    const [selection,setSelecion] = useState('posters');
    const [mostPopular,setMostPopular] = useState([]);

    const {lang} = useContext(globalContext);

    useEffect(()=>{

        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setMediaVed(data);
            const allData = data.backdrops.concat(data.posters)
                const popular = allData.filter((el)=> el.vote_average < 5.7);
                setMostPopular([...popular])
        })
    },[id,lang]);

    const MediaCard = ({data})=>{
        return (
            data?.map((media)=>(
                <div className="img-container" key={media?.file_path}>
                        <img 
                            loading="lazy"
                            src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} 
                            alt={media?.file_path}
                           />
                </div>
              ))

        )
    }

    return (
        <section className='movie-media'>
            <hr/>
            <header className="movie-media-header">
                <nav className="media-nav">
                    <h4 className="title">
                        media
                    </h4>
                    <div className="links">
                        <button 
                           className={selection === 'most popular' && 'active'}
                            onClick={()=> setSelecion('most popular')}
                           >
                                most poluar {mostPopular?.length}
                        </button>
                        <button 
                            className={selection === 'backdrops' && 'active'}
                            onClick={()=> setSelecion('backdrops')}
                            >
                                backdrops {mediaVed?.backdrops?.length}
                        </button>
                        <button 
                           className={selection === 'posters' && 'active'}
                            onClick={()=> setSelecion('posters')}
                           >
                                posters {mediaVed?.posters?.length}
                        </button>
                    </div>
                </nav>
                {
                    selection !== 'most popular' &&
                    <Link to={`movie/${id}/${selection}`} className="view-all">
                        veiw all {selection}
                    </Link> 

                }
            </header>
            <div className="media-content">
                <div className="media-content-container">
                    {  
                      selection === 'most popular' ?
                      <MediaCard data={mostPopular}/>:
                      selection === 'backdrops' ?
                      <MediaCard data={mediaVed?.backdrops}/>
                     : selection === 'posters' &&
                     <MediaCard data={ mediaVed?.posters}/> 
                    }

                </div>

            </div>
        </section>
    )
}

export default MovieMedia