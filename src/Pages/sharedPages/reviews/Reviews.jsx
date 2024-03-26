import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import fetchData from "../../../utilities/fetchData";
import ReviewCard from "../../../Components/sharedComponents/reviewCard/ReviewCard";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";

import './reviews.scss';

const Reviews = ({mediaType}) => {

    const {id} = useParams();
    const [reviews,setReviews] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const fetchReviewws = ()=>{

        setIsPending(true);
        setError(null);

        fetchData(`${mediaType}/${id}/reviews?language=en-US&page=1`)
        .then(data => {
            setReviews(data?.results);
        })
        .catch((error)=> {
            setError(error)
        })
        .finally(()=> {
            setIsPending(false);
        });
        
    }

    useEffect(fetchReviewws,[id]);


  return (
    <section className="reviews">
        <div className="revi-content">

            {
                isPending ? <Loading width='100%' height='calc(100vh -100px)' />
                : reviews ?
                reviews?.map((review)=> (
                    <ReviewCard key={review?.id}  review={review}/>
                ))
                :error && <Error error={error} height='calc(100vh -100px)' onClick={fetchReviewws} />
            }
        </div>
    </section>
  )
}

export default Reviews