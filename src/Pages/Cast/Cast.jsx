import React, { useEffect, useState } from 'react'
import MainMediaNav from '../../Components/MainMediaNav/MainMediaNav'
import fetchData from '../../Utilities/fetchData';
import { useParams } from 'react-router-dom';
import PersonCard from '../../Components/PersonCard/PersonCard';

import "./Cast.scss";

const Cast = () => {

    const [cast,setCast] = useState({});
    const [crew,setCrew] = useState();
    const {id} = useParams()

    useEffect(()=>{
       fetchData(`movie/${id}/credits?language=en-US`)
       .then((data)=>{
          setCast(data);
          setCrew(Object.groupBy(data?.crew, ({ department}) => department))
       })
    },[id]);

  return (
    <div className='cast'>
        <header className="cast-head">
            <MainMediaNav />
        </header>
        <section>
            <h5>cast {cast?.cast?.length}</h5>
            <div className="cast-content">
                {
                    cast?.cast?.map((person)=>(
                        <PersonCard key={person?.id} person={person}/>
                    ))
                }
            </div>
        </section>
        <section>
            <h5 className='cr-t'>crew {cast?.crew?.length}</h5> 
            <div className="cast-content">
                {
                    
                    Object.entries(crew)?.map((p)=>(
                        <>
                        <h5>{p[0]}</h5>
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
  )
}

export default Cast