import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import fetchData from '../../Utilities/fetchData';
import { useParams } from 'react-router-dom';
import PersonCard from '../../Components/PersonCard/PersonCard';

import "./Cast.scss";

const Cast = () => {

    const [cast,setCast] = useState({});
    const [crew,setCrew] = useState([]);
    const {id} = useParams()

    useEffect(()=>{
       fetchData(`movie/${id}/credits?language=en-US`)
       .then((data)=>{
          setCast(data);
          setCrew(Object.groupBy(data?.crew, ({ department}) => department));
          console.log(data)
       })
    },[id]);

  return (
    <div className='cast'>
        <header className="cast-head">
            <MainMediaNav />
        </header>
        <div className="cast-container">
            <section className='cast-part'>
                <h5 className='main-t'>
                    cast 
                    <span>{cast?.cast?.length}</span>
                </h5>
                <div className="cast-content">
                    {
                        cast?.cast?.map((person)=>(
                            <PersonCard key={person?.id} person={person}/>
                        ))
                    }
                </div>
            </section>
            <section className='cast-part'>
                <h5 className='main-t'>
                    crew 
                    <span>{cast?.crew?.length}</span>
                </h5> 
                <div className="cast-content">
                    {
                        crew &&
                        
                        Object.entries(crew)?.map((p)=>(
                            <>
                            <h5 className='main-t'>{p[0]}</h5>
                            {
                                p[1]?.map((person)=>(

                                    <PersonCard key={person?.id} person={person}/>
                                ))
                            }
                            </>
                        ))
                        
                    }
                </div>
            </section>

        </div>
    </div>
  )
}

export default Cast