import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import fetchData from '../../Utilities/fetchData';
import { globalContext } from '../../GlobalStateContext/GlobalContext';

const TrailerPlayer = () => {

    const {mediaType,mediaId,setIsTrailer} = useContext(globalContext);

    const [videoId,setVideoId] = useState(null);
    // const [mediaData,setMediaData] = useState({});

    useEffect(()=>{
        fetchData(`${mediaType}/${mediaId}/videos?language=en-US`)
        .then((data)=>{
            // setMediaData(data?.results);
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
                <div className="tr-player">
                    <ReactPlayer playing={true} controls url={`https://www.youtube.com/watch?v=${videoId}`} />
                </div>
            </header>
        </div>

    </section>
  )
}

export default TrailerPlayer