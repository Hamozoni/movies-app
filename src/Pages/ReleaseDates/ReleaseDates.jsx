import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import { useParams } from 'react-router-dom'
import fetchData from '../../Utilities/fetchData';

const ReleaseDates = () => {

    const {id} = useParams();
    const [dates,setDates] = useState([]);
    const [countries,setCountries] = useState([]);

    useEffect(()=>{

        fetchData(`movie/${id}/release_dates`)
        .then((dates)=>{
            setDates(Object.groupBy(dates.results,date=> date.iso_3166_1));
            console.log(Object.groupBy(dates.results,date=> date.iso_3166_1));
            fetchData(`configuration/countries?language=en-US`)
            .then((count)=>{
                const countriesList = Object.groupBy(count,c=> c.iso_3166_1);
                const filteredCountriesList = [];
                
                dates.results?.map((date)=>{
                    filteredCountriesList.push(countriesList[date.iso_3166_1][0])
                })

                setCountries(filteredCountriesList);
                console.log(filteredCountriesList);
            })
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