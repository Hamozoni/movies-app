import { Link } from "react-router-dom"
import ReviewCard from "../../ReviewCard/ReviewCard"
import { useContext, useEffect, useState } from "react"
import fetchData from "../../../Utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

import "./MovieSocial.scss";

const MovieSocial = ({id,section,mediaType})=> {

    const [reviews,setReviews] = useState([]);

    const {lang} = useContext(globalContext);

    useEffect(()=>{
        fetchData(`${mediaType}/${id}/${section}?language=${lang}&page=1`)
        .then((data)=>{
            setReviews(data?.results);
            console.log(data)
        })
    },[id,lang,section]);

  return (
    <section className="Movie-social">
        <hr />
        <header className="social-header">
            <h4 className="social-title">
                social
            </h4>
            <nav className="social-nav">
                <h5>reviews {reviews?.length} </h5>
                <h5>discussions </h5>
            </nav>
        </header>
        <div className="social-content">
            <ReviewCard review={reviews[0]} />
        </div>
        <Link to={`/movie/${id}/reviews`} className="read-review">
              read all reviews
        </Link>
        <hr />
    </section>
  )
}

export default MovieSocial