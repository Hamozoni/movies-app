import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import "./AlternativeTitles.scss";
import fetchData from '../../../utilities/fetchData';

const AlternativeTitles = ({mediaType}) => {
    const {id} = useParams();
    const [countries,setCountries] = useState([]);
    const [titles,setTiltes] = useState([]);
    const [titlesCount,setTiltesCount] = useState(0);

    const results = mediaType === 'tv' ? 'results' : 'titles'

    useEffect(()=>{

        fetchData(`${mediaType}/${id}/alternative_titles`)
        .then(title=>{
            console.log(title)
            setTiltes(Object.groupBy(title[results],ti => {
                return ti.iso_3166_1
            }));
            setTiltesCount(title[results]?.length)
           
            fetchData(`configuration/countries?language=en-US`)
            .then(data=> {
                    const newCoutListArray = []
                    data?.map((el)=>{

                        if(title[results]?.some(e=> e.iso_3166_1 === el.iso_3166_1)) {
                            newCoutListArray.push(el);
                            console.log(newCoutListArray);
                        }
                    });
                    setCountries(newCoutListArray)
                    
                console.log(data);

            })
        })
    },[id]);

  return (
    <main className="alt-titles">
        <div className="alt-content">
            <section className='alt-cout-list'>
                <header className='cout-header'>
                     <h3>Alternative Titles</h3>
                     <p>{titlesCount}</p>
                </header>
                <ul className="cout-list">     
                    {
                        countries?.map((cout)=>(
                            
                                
                            <li key={cout?.cout?.iso_3166_1}>
                                <h4>{cout?.native_name}</h4>
                                <span>{titles[cout?.iso_3166_1]?.length}</span>
                            </li>

                            
                        ))
                    }
                           
                </ul>
            </section>
            <section className='alt-t-tabels'>
                {
                    Object.entries(titles)?.sort()?.map((title)=>(
                        <tabel key={title?.title} className="titles-card">
                           <thead className='t-h'>
                              <tr>
                                 
                                    {
                                        countries?.map((cout)=>(
                                            cout?.iso_3166_1 === title[0] && 
                                            <h3> 
                                                <img src={`https://flagsapi.com/${cout?.iso_3166_1 }/shiny/64.png`}></img>
                                                {cout?.native_name}
                                            </h3>
                                        ))
                                    }
                                
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
                    ))
                }
            </section>
        </div>
    </main>
  )
}

export default AlternativeTitles