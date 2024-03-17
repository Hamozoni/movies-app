import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import "./AlternativeTitles.scss";
import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';
import { mediaColorContext } from '../../../GlobalStateContext/MediaColorContext';

const AlternativeTitles = ({mediaType}) => {

    const {color} = useContext(mediaColorContext);

    const {id} = useParams();
    const [countries,setCountries] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const [titles,setTiltes] = useState(null);

    const [titlesCount,setTiltesCount] = useState(0);

    const results = mediaType === 'tv' ? 'results' : 'titles';

    const fetchTitles = ()=> {

        setIsPending(true);
        setError(null);

        fetchData(`${mediaType}/${id}/alternative_titles`)
        .then(titles=>{
            console.log(titles[results]);
            setTiltes(titles[results]);
            setTiltesCount(titles[results]?.length);
           
        })
        .then(()=> {
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
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });
    };

    useEffect(fetchTitles,[id]);

  return (
    <main className="alt-titles">
        {
            isPending ? <Loading width='100%' height='300px' /> : 
            (countries && titles) ?
            <div className="alt-content">
                <section className='alt-cout-list card'>
                    <header className='cout-header' style={{backgroundColor : color.backColor,color: color.textColor}}>
                            <h3 style={{color :color.textColor}}>Alternative Titles</h3>
                            <p style={{color : color.textColor}}>{titlesCount}</p>
                    </header>
                    <ul className="cout-list">     
                        {
                            titles?.map((title)=>(   
                                <li 
                                    key={title?.iso_3166_1} 
                                    className='nav-btn'
                                    >
                                    <a href={`#${title?.iso_3166_1}`}>

                                        {countries?.find(e=> e.iso_3166_1 === title?.iso_3166_1)?.native_name}
                                        <span>1</span>
                                    </a>
                                </li> 
                            ))
                        }
                                
                    </ul>
                </section>
                <section className='alt-t-tabels'>
                    {
                        titles?.map((title)=>(
                            <TitlesTabel 
                                key={title?.title} 
                                title={title} 
                                country={countries?.find(e=> e.iso_3166_1 === title?.iso_3166_1)?.native_name}/>
                        ))
                    }
                </section>
            </div>
            : error && <Error error={error} height='300px' onClick={fetchTitles} />
        }
    </main>
  )
}

const TitlesTabel = ({title,country})=> {
    return (
        <tabel 
            id={title?.iso_3166_1}
            className="titles-card card">
        <thead className='t-h'>
           <tr>
                <h3> 
                    <img src={`https://flagsapi.com/${title?.iso_3166_1}/shiny/64.png`}></img>
                    {country}
                </h3>
           </tr>
        </thead>
        <tbody className='tbody'>
            <tr className='tr tr'>
               <td>title</td>
               <td>type</td>
            </tr>
            <tr className='tr'>
                <td>{title?.title}</td>
                <td >{title?.type}</td>
            </tr>
        </tbody>
     </tabel>
    )
}

export default AlternativeTitles