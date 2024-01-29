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
            setDates(dates?.results);
            console.log(dates.results);
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
        <div className="release-content">
            <section className='alt-cout-list'>
                <header className="cout-header">
                    <h3 >
                        Release Dates
                    </h3>
                    <p>{dates?.length}</p>
                </header>
                <ul className="cout-list">
                    {
                        countries?.map((count)=> (
                            <li key={count?.iso_3166_1}>
                                 <h4>{count?.native_name}</h4>
                                <span>{dates?.find(el=> el.iso_3166_1 === count.iso_3166_1)?.release_dates?.length}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    </main>
  )
}

export default ReleaseDates