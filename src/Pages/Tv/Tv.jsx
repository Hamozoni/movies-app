import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../../Utilities/fetchData';
import { globalContext } from '../../GlobalStateContext/GlobalContext';
import MovieTvCover from '../../Components/MovieTvCover/MovieTvCover';

const Tv = () => {
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState({});

    useEffect(()=>{
        fetchData(`tv/${id}?language=${lang}`)
        .then(data => {
            setDetails(data);
            console.log(data)
        })
    },[id.lang])

  return (
    <main className="tv">
        <div className="tv-container">
            <MovieTvCover details={details}/>

        </div>

    </main>
  )
}

export default Tv