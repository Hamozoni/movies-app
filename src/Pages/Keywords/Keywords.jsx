import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import fetchData from "../../utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./Keywords.scss";

import PageNumber from "../../Components/sharedComponents/pageNumber/PageNumber";
import Error from "../../Components/error/Error";
import Loading from "../../Components/loading/Loading";
import MediaInlineCard from "../../Components/sharedComponents/mediaInlineCard/MediaInlineCard";

const Keywords = () => {

  const {id} = useParams();
  const {lang} = useContext(globalContext);

  const [Keywords,setKeywords] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);
  const [page,setPage] = useState(1);

  const fetchKeywords = ()=>{
    document.title = 'keywords';
    setIsPending(true);
    setError(null);
    fetchData(`keyword/${id}/movies?include_adult=false&language=${lang}&page=${page}`)
    .then((data)=>{
      setKeywords(data);
    })
    .then(error=> {
       setError(error);
    })
    .finally(()=> {
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
                <MediaInlineCard key={movie?.id} movie={movie} type={movie.name ? 'tv' : 'movie'} />
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