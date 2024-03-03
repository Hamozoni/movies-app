import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import fetchData from '../../Utilities/fetchData';
import { globalContext } from '../../GlobalStateContext/GlobalContext';

import "./TrailerPlayer.scss"

const TrailerPlayer = () => {

    const {mediaType,mediaId,setIsTrailer} = useContext(globalContext);

    const [videoId,setVideoId] = useState(null);
    // const [mediaData,setMediaData] = useState({});

    useEffect(()=>{
        fetchData(`${mediaType}/${mediaId}/videos?language=en-US`)
        .then((data)=>{
            console.log(data?.results);
            setVideoId(data?.results[0]?.key)
        })

    },[mediaId]);


  return (
    <section className='trailer-player'>
        <div className="trialer-container">
            <header className="tr-header">
                <h4 className="off-tr">Official Trailer</h4>
                <span className="cancel" onClick={()=> setIsTrailer(false)}>
                    <CloseRoundedIcon />
                </span>
            </header>
                <div className="tr-player">
                    <ReactPlayer playing={true} controls url={`https://www.youtube.com/watch?v=${videoId}`} />
                </div>
        </div>

    </section>
  )
}

export default TrailerPlayer