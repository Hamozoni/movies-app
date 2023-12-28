import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";

import "./MovieMedia.scss";


const MovieMedia = ({id})=> {

    const [changes,sethanges] = useState({});
    const [mediaVed,setMediaVed] = useState([]);
    const [videos,setVideos] = useState({});
    const [selection,setSelecion] = useState('posters');

    const {lang} = useContext(globalContext);

    useEffect(()=>{
        fetchData(`movie/${id}/changes?language=${lang}&page=1`)
        .then((data)=>{
            sethanges(data?.changes);
            setVideos(data?.changes.find( video => video.key === 'videos'))
            console.log(data?.changes)
        })

        fetchData(`movie/${id}/images`)
        .then((data)=>{
            setMediaVed(data);
            console.log(data)

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
                            onClick={()=> setSelecion('backdrops')}
                            >
                                backdrops {mediaVed?.backdrops?.length}
                        </button>
                        <button 
                            onClick={()=> setSelecion('posters')}
                           >
                                posters {mediaVed?.posters?.length}
                        </button>
                    </div>
                </nav>
                <button className="view-all">
                     veiw all backdrops
                </button> 
            </header>
            <div className="media-content">
                    {  
                      selection === 'backdrops' ?
                      mediaVed?.backdrops?.map((media)=>(
                        <div className="img-container" key={media?.file_path}>
                                <img src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} alt="" />
                        </div>
                      )) : selection === 'posters' ?

                      mediaVed?.posters?.map((media)=>(
                        <div className="img-container poster" key={media?.file_path}>
                                <img src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} alt="" />
                        </div>
                      )) 
                      :

                      ''
                    }

            </div>
            <hr />
        </section>
    )
}

export default MovieMedia