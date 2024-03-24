import { useEffect, useState } from "react";


import "./Media.scss";
import { Link } from "react-router-dom";
// import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";
import VideosCard from "../../../Pages/sharedPages/mediaVideos/VideosCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MediaCard = ({data,type})=>{
    return (
        data?.map((media,i)=>(

            i < 9 &&
            <div className={`${type} img-container`}key={media?.file_path}>
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

    const [mediaImages,setMediaImages] = useState(null);
    const [selection,setSelecion] = useState('posters');
    const [mostPopular,setMostPopular] = useState([]);
    const [videos,setVideos] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [isPending2,setIsPending2] = useState(true);
    const [error2,setError2] = useState(null);

    // const {lang} = useContext(globalContext);

    const fetchImages = ()=> {

        setError(null);
        setIsPending(true)
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setMediaImages(data);
            const allData = data.backdrops.concat(data.posters)
                const popular = allData.filter((el)=> el.vote_average < 5.6);
                setMostPopular([...popular]);
                setIsPending(false);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false)
        });
    }
     useEffect(fetchImages,[id,mediaType])

    const fetchVidoes =  ()=> {
        setError2(null);
        setIsPending2(null);
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
    }
    useEffect(fetchVidoes,[id,mediaType]);

    return (
        <section className='movie-media'>
            <header className="movie-media-header">
                <nav className="media-nav">
                    <h4 className="title">
                        media
                    </h4>
                    <ul className="links">
                        <li 
                           className={`${selection === 'most popular' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('most popular')}
                           >
                                most poluar
                        </li>
                        <li 
                            className={`${selection === 'videos' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('videos')}
                            >
                                videos {videos?.length}
                        </li>
                        <li 
                            className={`${selection === 'backdrops' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('backdrops')}
                            >
                                backdrops {mediaImages?.backdrops?.length}
                        </li>
                        <li 
                           className={`${selection === 'posters' && 'active'} nav-btn`}
                            onClick={()=> setSelecion('posters')}
                           >
                                posters {mediaImages?.posters?.length}
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="media-content">
                <div className="media-content-container">
                    {
                         isPending ? <Loading width='100%' height='300px' /> :
                        mediaImages ?
                            ( 
                                selection === 'most popular' ?
                                <MediaCard data={mostPopular} type='popular' />:
                                selection === 'backdrops' ?
                                <MediaCard data={mediaImages?.backdrops} type='backdrops'/>
                                : selection === 'posters' ?
                                <MediaCard data={ mediaImages?.posters} type='posters'/> 
                                : 
                                selection === 'videos'  && (
                                    isPending2 ? <Loading width='100%' height='300px' /> : 
                                    videos ?
                                    videos?.map((video,i)=> (
                                        i < 8 &&
                                        <VideosCard yId={video?.key}  type={video?.type} title={video?.name}/>
                                    ))
                                    : error2 &&  <Error error={error2}  height='300px' onClick={fetchImages} />
                                )
                            
                            ): error && <Error error={error}  height='300px' onClick={fetchVidoes} />
                    }
                    {
                        (selection !== 'most popular' && videos ) &&
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
            {
                selection !== 'most popular' &&
                <Link  
                    to={`/${mediaType}/${id}/${selection === 'videos' ?  "videos?type=" + videos[0]?.type : selection}`} 
                    className="view-all" >
                    veiw all {selection}
                </Link> 

            }
        </section>
    )
}

export default MovieMedia