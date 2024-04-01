import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Media.scss";

import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { languages } from "../../../utilities/languages";

import VideosCard from "../../../Pages/sharedPages/mediaVideos/VideosCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MediaCard = ({data,type})=>{
    return (
        data?.map((media,i)=>(

            i < 9 &&
            <div className={`${type} img-container`}key={media?.file_path}>
                <img 
                    className="image-hover"
                    loading="lazy"
                    src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} 
                    alt={media?.file_path}
                    />
            </div>
          ))

    )
};


const MovieMedia = ({id,mediaType})=> {

    const {lang,theme} = useContext(globalContext);

    const [mediaImages,setMediaImages] = useState(null);
    const [selection,setSelecion] = useState('backdrops');
    const [mostPopular,setMostPopular] = useState([]);
    const [videos,setVideos] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [isPending2,setIsPending2] = useState(true);
    const [error2,setError2] = useState(null);

    const fetchImages = ()=> {

        setError(null);
        setIsPending(true)
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setMediaImages(data);
            const allData = data.backdrops.concat(data.posters)
                const popular = allData.filter((el)=> el.vote_average < 5.6);
                setMostPopular([...popular]);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false)
        })
    }
     useEffect(fetchImages,[id,mediaType])

    const fetchVidoes =  ()=> {
        setError2(null);
        setIsPending2(null);
        fetchData(`${mediaType}/${id}/videos?language=${lang}`)
        .then(data=> {
            setVideos(data?.results);
        })
        .catch(error=> {
            setError2(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }
    useEffect(fetchVidoes,[id,mediaType,lang]);

    return (
        <section className='movie-media b-b'>
            <header className="movie-media-header">
                <nav className="media-nav">
                    <h4 className={`title t-color-${theme}`}>
                        {languages[lang].media}
                    </h4>
                    <ul className="links">
                        <li 
                           className={`${selection === 'most popular' && 'active'} nav-btn t-color-${theme}-1`}
                            onClick={()=> setSelecion('most popular')}
                           >
                               {languages[lang].popular}
                        </li>
                        <li 
                            className={`${selection === 'videos' && 'active'} nav-btn t-color-${theme}-1`}
                            onClick={()=> setSelecion('videos')}
                            >
                                 {languages[lang].videos} {videos?.length}
                        </li>
                        <li 
                            className={`${selection === 'backdrops' && 'active'} nav-btn t-color-${theme}-1`}
                            onClick={()=> setSelecion('backdrops')}
                            >
                               {languages[lang].backdrops} {mediaImages?.backdrops?.length}
                        </li>
                        <li 
                           className={`${selection === 'posters' && 'active'} nav-btn t-color-${theme}-1`}
                            onClick={()=> setSelecion('posters')}
                           >
                                {languages[lang].posters} {mediaImages?.posters?.length}
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
                                className="link-color"
                                to={`/${mediaType}/${id}/${selection === 'videos' ?  "videos?type=" + videos[0]?.type : selection}`}
                                >
                                {languages[lang].viewMore}
                            </Link>
                        </div>
                    }

                </div>

            </div>
            {
                selection !== 'most popular' &&
                <Link  
                    to={`/${mediaType}/${id}/${selection === 'videos' ?  "videos?type=" + videos[0]?.type : selection}`} 
                    className="view-all link-color" >
                    {languages[lang].viewAll} {languages[lang][selection]}
                </Link> 

            }
        </section>
    )
}

export default MovieMedia