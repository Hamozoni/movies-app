import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../../../utilities/fetchData';


const ReleaseDates = ({mediaType}) => {

    const {id} = useParams();
    const [dates,setDates] = useState([]);
    const [countries,setCountries] = useState([]);

    useEffect(()=>{

        fetchData(`${mediaType}/${id}/release_dates`)
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
        <div className="alt-content">
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
                            <li key={count?.iso_3166_1} className='nav-btn'>
                                 <h4>{count?.native_name}</h4>
                                <span>{dates?.find(el=> el.iso_3166_1 === count.iso_3166_1)?.release_dates?.length}</span>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section className='alt-t-tabels'>
                {
                    dates.map((date)=>(
                        <tabel key={date?.iso_3166_1} className="titles-card">
                           <thead className='t-h'>
                              <tr>

                                <h3> 
                                    <img src={`https://flagsapi.com/${date?.iso_3166_1 }/shiny/64.png`}></img>
                                    {countries?.find(el=> el.iso_3166_1 === date.iso_3166_1)?.native_name}
                                </h3>

                                
                              </tr>
                           </thead>
                           <tbody className='tbody'>
                               <tr className='tr tr'>
                                  <td>Date</td>
                                  <td>Certification</td>
                                  <td>type</td>
                                  <td>Language</td>
                               </tr>
                               {
                                  date?.release_dates?.map((relDate)=>(
                                    
                                    <tr key={relDate?.release_date} className='tr'>
                                        <td>{new Date(relDate?.release_date)?.toLocaleDateString()}</td>
                                        <td >{relDate?.certification}</td>
                                        <td >{relDate?.type}</td>
                                        <td >{relDate?.iso_639_1}</td>
                                    </tr>

                                  ))
                               }
                           </tbody>
                        </tabel>
                    ))
                }
            </section>
        </div>
    </main>
  )
}

export default ReleaseDates