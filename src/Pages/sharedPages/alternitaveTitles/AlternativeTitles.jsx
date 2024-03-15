import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import "./AlternativeTitles.scss";
import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';

const AlternativeTitles = ({mediaType}) => {

    const {id} = useParams();
    const [countries,setCountries] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const [titles,setTiltes] = useState(null);
    const [isPending2,setIsPending2] = useState(true);
    const [error2,setError2] = useState(null);

    const [titlesCount,setTiltesCount] = useState(0);

    const results = mediaType === 'tv' ? 'results' : 'titles';

    const fetchCountries = ()=> {

        setIsPending(true);
        setError(null);

        fetchData(`configuration/countries?language=en-US`)
        .then(data=> {
            setCountries(data);
            setIsPending(false);       
            console.log(data);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });
    };

    const fetchTitles = ()=> {
        setIsPending2(true);
        setError2(null);
        fetchData(`${mediaType}/${id}/alternative_titles`)
        .then(title=>{
            console.log(title);
            setTiltes(Object.groupBy(title[results],ti => ti.iso_3166_1));
            setTiltesCount(title[results]?.length);
            setIsPending2(false);
           
        })
        .catch(error=> {
            setError2(error);
            setIsPending2(false);
        });
    };

    useEffect(()=>{
        fetchCountries();
        fetchTitles()
    },[id]);

  return (
    <main className="alt-titles">
        <div className="alt-content">
            <section className='alt-cout-list card'>
                <header className='cout-header'>
                     <h3>Alternative Titles</h3>
                     <p>{titlesCount}</p>
                </header>
                <ul className="cout-list">     
                    {
                        isPending ? <Loading width='100%' height='300px' /> : 
                        (countries && titles) ?
                        Object.keys(titles)?.map((cout)=>(   
                            <li 
                                key={cout} 
                                className='nav-btn'
                                >
                                    <a href={`#${cout}`}>

                                        {countries?.find(e=> e.iso_3166_1 === cout)?.native_name}
                                        <span>{titles[cout]?.length}</span>
                                    </a>
                            </li> 
                        ))
                        : error && <Error error={error} height='300px' onClick={fetchCountries} />
                    }
                           
                </ul>
            </section>
            <section className='alt-t-tabels'>
                {
                    isPending2 ? <Loading  width='100%' height='300px'/> : 
                    (countries && titles) ?
                    Object.entries(titles)?.sort()?.map((title)=>(
                        <TitlesTabel 
                            key={title?.title} 
                            title={title} 
                            country={countries?.find(e=> e.iso_3166_1 === title[0])?.native_name}/>
                    ))
                    : error2 && <Error error={error2} height='300px' onClick={fetchTitles} />
                }
            </section>
        </div>
    </main>
  )
}

const TitlesTabel = ({title,country})=> {
    return (
        <tabel 
            id={title[0]}
            key={title?.title}
            className="titles-card card">
        <thead className='t-h'>
           <tr>
                <h3> 
                    <img src={`https://flagsapi.com/${title[0]}/shiny/64.png`}></img>
                    {country}
                </h3>
           </tr>
        </thead>
        <tbody className='tbody'>
            <tr className='tr tr'>
               <td>title</td>
               <td>type</td>
            </tr>
            {
               title[1]?.map((t)=>(
                 <tr key={t?.title} className='tr'>
                     <td>{t?.title}</td>
                     <td >{t?.type}</td>
                 </tr>

               ))
            }
        </tbody>
     </tabel>
    )
}

export default AlternativeTitles