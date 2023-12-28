import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";


const MovieMedia = ({id})=> {

    const [changes,sethanges] = useState({});
    const [mediaVed,setMediaVed] = useState([]);
    const [video,setVideo] = useState({});
    const [selection,setSelecion] = useState('video');

    const {lang} = useContext(globalContext);

    useEffect(()=>{
        fetchData(`movie/${id}/changes?language=${lang}&page=1`)
        .then((data)=>{
            sethanges(data?.changes);
            setVideo(data?.changes.find( video => video.key === 'videos'))
            console.log(data?.changes)
        })

        fetchData(`movie/${id}/images`)
        .then((data)=>{
            setMediaVed(data);
        })
    },[id,lang,selection]);

    return (
        <section className='movie-media'>
            <header className="movie-media-header">
                <h4 className="title"></h4>
                <nav className="media-nav">
                    <h5>videos</h5>
                    <h5>backdrops</h5>
                    <h5>posters</h5>
                </nav>
                <button className="view-all">

                </button>
            </header>
            <div className="media-content">
                <div className="img-container">
                    {/* {  
                      selection === 'vedio' ?
                      changes?.map((media)=>(
                        media?.key === "videos" &&
                        <img src="" alt="" />
                      )) :

                      ''
                    } */}

                </div>
            </div>
        </section>
    )
}

export default MovieMedia