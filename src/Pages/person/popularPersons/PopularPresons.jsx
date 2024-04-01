import { useContext, useEffect, useState } from "react"


import './PopularPersons.scss';
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import fetchData from "../../../utilities/fetchData";

import PersonCard from "../../../Components/personComponents/PersonCard/PersonCard";
import PageNumber from "../../../Components/sharedComponents/pageNumber/PageNumber";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";


const PopularPresons = () => {

    const {lang,theme} = useContext(globalContext);

    const [page,setPage] = useState(1);
    const [persons,setPersons] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);
    const [totalPages,setTotalPages] = useState(1);

    const fetchPersons = ()=>{
        document.title = lang === 'ar' ?  'مشاهير': 'popular people';
        setIsPending(true);
        setError(null);
        fetchData(`person/popular?language=${lang}&page=${page}`)
        .then((data)=> {
            setPersons(data?.results);
            setTotalPages(data?.total_pages);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false)
        })
    }

    useEffect(fetchPersons,[page,lang]);

  return (
    <section className="popular-people">
        <h4 className={`t-color-${theme} p-title`}>
            {lang === 'ar' ?  'مشاهير': 'popular people'}
        </h4>
        <div className="persons-cards">

            {
                isPending ? <Loading width='100%'  height='calc(100vh - 100px)'/> 
                : persons ?
                persons?.map((person)=> (
                    <PersonCard key={person?.id} person={person}/>
                ))
                : error && <Error error={error}  height='calc(100vh - 100px)' onClick={fetchPersons} />
            }
        </div>
        <PageNumber page={page} setPage={setPage} totalPages={totalPages}/>
    </section>
  )
}

export default PopularPresons