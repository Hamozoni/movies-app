import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import fetchData from '../../Utilities/fetchData';
import { useParams } from 'react-router-dom';

const AlternativeTitles = () => {
    const {id} = useParams();
    const [countries,setCountries] = useState([]);
    const [titles,setTiltes] = useState([]);

    useEffect(()=>{

        fetchData(`movie/${id}/alternative_titles`)
        .then(title=>{
            setTiltes(Object.groupBy(title.titles,ti => {
                return ti.iso_3166_1
            }));
           
            fetchData(`configuration/countries?language=en-US`)
            .then(data=> {
                    const newCoutListArray = []
                    data?.map((el)=>{

                        if(title?.titles?.some(e=> e.iso_3166_1 === el.iso_3166_1)) {
                            newCoutListArray.push(el);
                            console.log(newCoutListArray);
                        }
                    });
                    setCountries(newCoutListArray)
                    
                console.log(data);

            })
        })
    },[id]);

    console.log(Object.entries(titles));
  return (
    <main className="alt-titles">
        <header className="alt-header">
            <MainMediaNav />
        </header>
        <div className="alt-content">
            <section className='alt-cout-list'>
                <header className='cout-header'>
                     <h3>Alternative Titles</h3>
                     <p>{titles?.length}</p>
                </header>
                <ul className="cout-list">     
                    {
                        countries?.map((cout)=>(
                            
                                
                            <li>
                                <span>{cout?.native_name}</span>
                                <span>1</span>
                            </li>

                            
                        ))
                    }
                           
                </ul>
            </section>
            <section className='alt-t'>
                {
                    Object.entries(titles)?.map((title)=>(
                        <tabel key={title?.title} className="titles-card" style={{display: 'block'}}>
                           <thead>
                              <tr>
                                 
                                    {
                                        countries?.map((cout)=>(
                                            cout?.iso_3166_1 === title[0] && 
                                            <h3>{cout?.native_name}</h3>
                                        ))
                                    }
                                
                              </tr>
                           </thead>
                           <tbody>
                               <tr>
                                  <td>title</td>
                                  <td>type</td>
                               </tr>
                               {
                                  title[1]?.map((t)=>(
                                    <tr key={t?.title}>
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