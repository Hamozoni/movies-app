import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import fetchData from '../../Utilities/fetchData';
import { useParams } from 'react-router-dom';

const Cast = () => {

    const [cast,setCast] = useState({});
    const {id} = useParams()

    useEffect(()=>{
       fetchData(`movie/${id}/credits?language=en-US`)
       .then((data)=>{
          setCast(data);
          console.log(data)
       })
    },[id]);

  return (
    <div className='cast'>
        <header className="cast-head">
            <MainMediaNav />
        </header>
        <section>
            <h5>cast {cast?.cast?.length}</h5>
        </section>
        <section>
            <h5>crew {cast?.crew?.length}</h5>
        </section>
    </div>
  )
}

export default Cast