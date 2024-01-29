import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import { useParams } from 'react-router-dom'
import fetchData from '../../Utilities/fetchData';

const ReleaseDates = () => {

    const {id} = useParams();
    const [dates,setDates] = useState([]);

    useEffect(()=>{

        fetchData(`movie/${id}/release_dates`)
        .then((dates)=>{
            setDates(dates.results);
            console.log(dates.results)
        })

    },[id]);

  return (
    <main className="release-date">
        <header className="release-head">
            <MainMediaNav />
        </header>
    </main>
  )
}

export default ReleaseDates