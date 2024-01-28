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
            setTiltes(title?.titles);
            console.log(title?.titles);
            fetchData(`configuration/countries?language=en-US`)
            .then(data=> {
                    const newCoutListArray = []
                    data?.map((el)=>{

                        if(title?.titles?.some(e=> e.iso_3166_1 === el.iso_3166_1)) {
                            //   setCountries(prev=> [prev,el])
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
        <header className="alt-header">
            <MainMediaNav />
        </header>
        <div className="alt-content">
            <section className='alt-menu'>
                <header className='menu-header'>
                     <h3>Alternative Titles</h3>
                     <p>{titles?.length}</p>
                </header>
                <ul className="cout-list">     
                    {
                        countries?.map((cout)=>(
                            
                                
                            <li>
                                <span>{cout?.native_name}</span>
                                <span></span>
                            </li>

                            
                        ))
                    }
                           
                </ul>
            </section>
        </div>
    </main>
  )
}

export default AlternativeTitles