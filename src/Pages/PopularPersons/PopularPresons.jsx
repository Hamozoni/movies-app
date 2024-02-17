import { useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData";
import PersonCard from "../../Components/PersonCard/PersonCard";

import './PopularPersons.scss';
import PageNumber from "../../Components/PageNumber/PageNumber";

const PopularPresons = () => {

    const [page,setPage] = useState(1);
    const [persons,setPersons] = useState([]);
    const [totalPages,setTotalPages] = useState(1)

    useEffect(()=>{
        fetchData(`person/popular?language=en-US&page=${page}`)
        .then((data)=> {
            setPersons(data?.results);
            setTotalPages(data?.totalPages)
            console.log(data?.results)
        })
    },[page]);

  return (
    <section className="popular-people">
        <h4 className="p-title">popular people</h4>
        <div className="persons-cards">

            {
                persons?.map((person)=> (
                    <PersonCard key={person?.id} person={person}/>
                ))
            }
        </div>
        <PageNumber page={page} setPage={setPage} totalPages={totalPages}/>
    </section>
  )
}

export default PopularPresons