import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import fetchData from '../../../utilities/fetchData';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

import "./TrailerPlayer.scss"

const TrailerPlayer = () => {

    const {setTrailer,trailer} = useContext(globalContext);

    const handleTrailer = ()=> {
        setTrailer(prev=> {
         return  { ...prev,isTrailer : false }
        })
    }


  return (
    <section className='trailer-player'>
        <div className="trialer-container">
            <header className="tr-header">
                <h4 className="off-tr">{trailer?.type}</h4>
                <span className="cancel" onClick={handleTrailer}>
                    <CloseRoundedIcon />
                </span>
            </header>
                <div className="tr-player">
                    <ReactPlayer className='media-player'  playing={true} controls url={`https://www.youtube.com/watch?v=${trailer?.youtubeId}`} />
                </div>
        </div>

    </section>
  )
}

export default TrailerPlayer