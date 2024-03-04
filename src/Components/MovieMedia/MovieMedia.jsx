import { useContext, useEffect, useState } from "react";
import { globalContext } from "../../GlobalStateContext/GlobalContext";
import fetchData from "../../Utilities/fetchData";

import "./MovieMedia.scss";


const MovieMedia = ({id,mediaType})=> {

    const [mediaVed,setMediaVed] = useState([]);
    const [selection,setSelecion] = useState('posters');

    const {lang} = useContext(globalContext);

    useEffect(()=>{

        fetchData(`${mediaType}/${id}/images`)
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
                <button className="view-all">
                     veiw all backdrops
                </button> 
            </header>
            <div className="media-content">
                <div className="media-content-container">
                    {  
                      selection === 'backdrops' ?
                      mediaVed?.backdrops?.map((media)=>(
                        <div className="img-container" key={media?.file_path}>
                                <img 
                                    loading="lazy"
                                    src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} 
                                    alt={media?.file_path}
                                   />
                        </div>
                      )) : selection === 'posters' ?

                      mediaVed?.posters?.map((media)=>(
                        <div className="img-container poster" key={media?.file_path}>
                                <img 
                                    loading="lazy"
                                    src={process.env.REACT_APP_BASE_URL + 'original' + media?.file_path} 
                                    alt={media?.file_path} 
                                    />
                        </div>
                      )) 
                      :

                      ''
                    }

                </div>

            </div>
        </section>
    )
}

export default MovieMedia