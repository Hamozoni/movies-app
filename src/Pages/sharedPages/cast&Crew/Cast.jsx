import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import "./Cast.scss";
import fetchData from '../../../utilities/fetchData';
import PersonCard from '../../../Components/personComponents/PersonCard/PersonCard';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';

const Cast = ({mediaType}) => {

    const [cast,setCast] = useState(null);
    const [crew,setCrew] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const {id} = useParams();

    const fetchCast = ()=>{
        setIsPending(true);
        setError(null);
       fetchData(`${mediaType}/${id}/credits?language=en-US`)
       .then((data)=>{
          setCast(data);
          setCrew(Object.groupBy(data?.crew, ({ department}) => department));
          setIsPending(false);
       })
       .catch(error=> {
           setError(error);
           console.log(error);
           setIsPending(false);
       })
    }

    useEffect(fetchCast,[id]);

  return (
    <div className='cast'>
        <div className="cast-container">
            <section className='cast-part'>
                <h5 className='main-t'>
                    cast 
                    <span>{cast?.cast?.length}</span>
                </h5>
                <div className="cast-content">
                    {
                        isPending ? <Loading width='100%' height='400px'/> :
                        cast ? 
                        cast?.cast?.map((person)=>(
                            <PersonCard key={person?.id} person={person}/>
                        ))
                        : error && <Error error={error} height='400px' onClick={fetchCast}/> 
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
                        isPending ? <Loading width='100%' height='400px'/> :
                        crew ?
                        
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
                        : error && <Error error={error} height='400px' onClick={fetchCast}/>
                        
                    }
                </div>
            </section>

        </div>
    </div>
  )
}

export default Cast