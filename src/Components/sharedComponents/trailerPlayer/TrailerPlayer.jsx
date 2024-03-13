import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import fetchData from '../../../utilities/fetchData';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

import "./TrailerPlayer.scss"

const TrailerPlayer = () => {

    const {youtubeId,setIsTrailer} = useContext(globalContext);


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
                    <ReactPlayer playing={true} controls url={`https://www.youtube.com/watch?v=${youtubeId}`} />
                </div>
        </div>

    </section>
  )
}

export default TrailerPlayer