import { useContext, useEffect, useState } from "react"
import fetchData from "../../utilities/fetchData"
import { Link, useParams } from "react-router-dom"
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./Keywords.scss";
import PageNumber from "../../Components/sharedComponents/pageNumber/PageNumber";
import Error from "../../Components/error/Error";
import Loading from "../../Components/loading/Loading";
import MediaCard from "../../Components/sharedComponents/mediaCard/MediaCard";

const Keywords = () => {

  const {id} = useParams();
  const {lang} = useContext(globalContext);

  const [Keywords,setKeywords] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);
  const [page,setPage] = useState(1);

  const fetchKeywords = ()=>{

    setIsPending(true);
    setError(null);
    fetchData(`keyword/${id}/movies?include_adult=false&language=${lang}&page=${page}`)
    .then((data)=>{
      setKeywords(data);
      setIsPending(false);
      console.log(data);
    })
    .then(error=> {
       setError(error);
       setIsPending(false);
    })
  }

  useEffect(fetchKeywords,[id,lang,page]);


  return (
     <main className="keywords-page">
        <div className="keywords-container">
          <div className="key-content">
             {
               isPending ? <Loading width='100%' height='100vh' /> : Keywords ?
              Keywords?.results?.map((movie)=> (
                <MediaCard key={movie?.id} movie={movie} />
              )) 
              : error && <Error error={error} height='100vh' onClick={fetchKeywords} />
             }

          </div>
          <PageNumber page={page} setPage={setPage} totalPages={Keywords?.total_pages}/>
        </div>
     </main>
  )
}

export default Keywords;