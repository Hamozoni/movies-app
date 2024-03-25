import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import "./MovieSocial.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import ReviewCard from "../../sharedComponents/reviewCard/ReviewCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import { languages } from "../../../utilities/languages";

const MovieSocial = ({section,mediaType})=> {

    const {id} = useParams();

    const [reviews,setReviews] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const {lang} = useContext(globalContext);

    const fetch = ()=>{
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${id}/${section}?language=${lang}&page=1`)
        .then((data)=>{
            setReviews(data?.results);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetch,[id,lang,section,mediaType]);

  return (
    <section className="Movie-social b-b">
        <header className="social-header">
            <h4 className="social-title">
                {languages[lang].social}
            </h4>
            <ul className="social-nav">
                <li className="nav-btn">
                    {languages[lang].reviews} {reviews?.length}
                </li>
            </ul>
        </header>
        {
            isPending ? <Loading width='100%' height='300px'/> :
            reviews ?
            <>
                <div className="social-content"> 
                       {
                         reviews.length > 0 ?
                         <ReviewCard review={reviews[0]} />
                         :
                         <p className="no-result"> We don't have any reviews for .... Would you like to write one?</p>
                       }
                </div>
                {
                     reviews.length > 0 &&
                    <Link to={`/${mediaType}/${id}/reviews`} className="read-all-review link-hover"> 
                        {languages[lang].readAllreviews}
                    </Link>
                }
            </>
            : error && <Error error={error} height='300px' onClick={fetch}/>
        }
    
        
    </section>
  )
}

export default MovieSocial