import { useContext, useEffect, useState } from "react";


import "./Media.scss";
import { Link } from "react-router-dom";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import VideosCard from "../../../Pages/sharedPages/mediaVideos/VideosCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MediaCard = ({data})=>{
    return (
        data?.map((media,i)=>(

            i < 9 &&
            <div className="img-container" key={media?.file_path}>
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} 
                        alt={media?.file_path}
                       />
            </div>
          ))

    )
};


const MovieMedia = ({id,mediaType})=> {

    const [mediaVed,setMediaVed] = useState([]);
    const [selection,setSelecion] = useState('posters');
    const [mostPopular,setMostPopular] = useState([]);
    const [videos,setVideos] = useState([]);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [isPending2,setIsPending2] = useState(true);
    const [error2,setError2] = useState(null);

    const {lang} = useContext(globalContext);

    useEffect(()=>{

        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setMediaVed(data);
            const allData = data.backdrops.concat(data.posters)
                const popular = allData.filter((el)=> el.vote_average < 5.6);
                setMostPopular([...popular]);
                setIsPending(false);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false)
        });

        fetchData(`${mediaType}/${id}/videos?language=en-US`)
        .then(data=> {
            setVideos(data?.results);
            setIsPending2(false);
        })
        .catch(error=> {
            setError2(error);
            setIsPending2(false);
            console.log(error)
        })

    },[id,lang]);

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
                           className={`${selection === 'most popular' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('most popular')}
                           >
                                most poluar
                        </button>
                        <button 
                            className={`${selection === 'videos' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('videos')}
                            >
                                videos {videos?.length}
                        </button>
                        <button 
                            className={`${selection === 'backdrops' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('backdrops')}
                            >
                                backdrops {mediaVed?.backdrops?.length}
                        </button>
                        <button 
                           className={`${selection === 'posters' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('posters')}
                           >
                                posters {mediaVed?.posters?.length}
                        </button>
                    </div>
                </nav>
                {
                    selection !== 'most popular' &&
                    <Link  
                        to={`/${mediaType}/${id}/${selection === 'videos' ?  "videos?type=" + videos[0]?.type : selection}`} 
                        className="view-all" >
                        veiw all {selection}
                    </Link> 

                }
            </header>
            <div className="media-content">
                <div className="media-content-container">
                    {
                         isPending ? <Loading width='100%' height='300px' /> :
                        mediaVed ?
                            ( 
                                selection === 'most popular' ?
                                <MediaCard data={mostPopular}/>:
                                selection === 'backdrops' ?
                                <MediaCard data={mediaVed?.backdrops}/>
                                : selection === 'posters' ?
                                <MediaCard data={ mediaVed?.posters}/> 
                                : 
                                selection === 'videos'  && (
                                    isPending2 ? <Loading width='100%' height='300px' /> : 
                                    videos ?
                                    videos?.map((video,i)=> (
                                        i < 8 &&
                                        <VideosCard yId={video?.key}  type={video?.type} title={video?.name}/>
                                    ))
                                    : error2 &&  <Error error={error2}/>
                                )
                            
                            ): error && <Error error={error} />
                    }
                    {
                        selection !== 'most popular' &&
                        <div className="view-more">
                            <Link 
                                to={`/${mediaType}/${id}/${selection === 'videos' ?  "videos?type=" + videos[0]?.type : selection}`}
                                >
                                view more
                            </Link>
                        </div>
                    }

                </div>

            </div>
        </section>
    )
}

export default MovieMedia