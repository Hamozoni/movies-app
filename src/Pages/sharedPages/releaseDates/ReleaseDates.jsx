import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';
import { mediaColorContext } from '../../../GlobalStateContext/MediaColorContext';


const ReleaseDates = ({mediaType}) => {

    const {color} = useContext(mediaColorContext);


    const {id} = useParams();
    const [dates,setDates] = useState(null);
    const [countries,setCountries] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetchDates = ()=>{
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${id}/release_dates`)
        .then((dates)=>{
            setDates(dates?.results);
            console.log(dates.results);
        }).then(()=> {
            fetchData(`configuration/countries?language=en-US`)
            .then((count)=>{
                setCountries(count);
                setIsPending(false);
            })
            .catch(error=> {
                setError(error);
                setIsPending(false);
            });
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });

    }

    useEffect(fetchDates,[id,mediaType]);

  return (
    <main className="release-date">
        {
            isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> 
            : dates ?
            <div className="alt-content">
                <section className='alt-cout-list card'>
                    <header 
                        className="cout-header" 
                        style={{backgroundColor:color.backColor}}
                        >

                        <h3 style={{color: color.textColor}}>
                            Release Dates
                        </h3>
                        <p style={{color: color.textColor}}> {dates?.length}</p>
                    </header>
                    <ul className="cout-list">
                        {
                            dates?.map((date)=> (
                                <li key={date?.iso_3166_1} className='nav-btn'>
                                    <a href={`#${date.iso_3166_1}`}>
                                        <h4>{countries?.find(el=> el.iso_3166_1 === date.iso_3166_1)?.native_name}</h4>
                                        <span>{date?.release_dates?.length}</span>

                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </section>
                <section className='alt-t-tabels'>
                    {
                        dates.map((date)=>(
                            <tabel 
                                id={date?.iso_3166_1}
                                key={date?.iso_3166_1} 
                                className="titles-card card">
                            <thead className='t-h'>
                                <tr>

                                    <div className='count-name'> 
                                        <span className='count-imge'>
                                            <img src={`https://flagsapi.com/${date?.iso_3166_1 }/shiny/64.png`}></img>
                                        </span>
                                        <h3>{countries?.find(el=> el.iso_3166_1 === date.iso_3166_1)?.native_name}</h3> 
                                    </div>

                                    
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
            : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchDates}/>
        }
    </main>
  )
}

export default ReleaseDates