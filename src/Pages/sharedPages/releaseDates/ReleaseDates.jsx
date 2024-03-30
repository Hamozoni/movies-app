import React, { useContext, useEffect, useState } from 'react'
import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';
import { mediaColorContext } from '../../../GlobalStateContext/MediaColorContext';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import { useLocation } from 'react-router-dom';


const ReleaseDates = () => {

    const {color} = useContext(mediaColorContext);
    const {countries,theme,lang} = useContext(globalContext);

    const [dates,setDates] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const pathName = useLocation().pathname;

    const fetchDates = ()=>{
        setIsPending(true);
        setError(null);

        fetchData(`${pathName.replace('releaseDates','release_dates')}`)
        .then((dates)=>{
            setDates(dates?.results);
        })
        .catch(error=> {
            setError(error);
        }).finally(()=> {
            setIsPending(false);
        })

    }

    useEffect(fetchDates,[pathName]);

    const isEnglish = lang === 'en';

  return (
    <main className="release-date">
        {
            isPending ? <Loading width='100%' height='calc(100vh - 100px)'/> 
            : dates ?
            <div className="alt-content">
                <section className={`back-color-${theme}-1 alt-cout-list`}>
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
                                    <a 
                                        href={`#${date.iso_3166_1}`} 
                                        className={`t-color-${theme}-2`}
                                        >
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
                                            < img src={`https://flagsapi.com/${date?.iso_3166_1 }/shiny/64.png`} alt='flag' />
                                        </span>
                                        <h3 className={`t-color-${theme}`}>
                                            {countries?.find(el=> el.iso_3166_1 === date.iso_3166_1)?.native_name}
                                        </h3> 
                                    </div>

                                    
                                </tr>
                            </thead>
                            <tbody className='tbody'>
                                <tr className={`t-color-${theme}-1 tr tr`}>
                                    <td>{isEnglish ? 'Date' : 'التاريخ'}</td>
                                    <td>{isEnglish ? 'Certification' : 'الشهادة'}</td>
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