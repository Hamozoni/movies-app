import { Link } from "react-router-dom"
import ReviewCard from "../ReviewCard/ReviewCard"
import { useContext, useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData";
import { globalContext } from "../../GlobalStateContext/GlobalContext";

import "./MovieSocial.scss";

const MovieSocial = ({id})=> {

    const [reviews,setReviews] = useState([]);

    const {lang} = useContext(globalContext);

    useEffect(()=>{
        fetchData(`movie/${id}/reviews?language=${lang}&page=1`)
        .then((data)=>{
            setReviews(data?.results);
            console.log(data)
        })
    },[id,lang]);

  return (
    <section className="Movie-social">
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
        <Link className="read-review">
              read all reviews
        </Link>
    </section>
  )
}

export default MovieSocial