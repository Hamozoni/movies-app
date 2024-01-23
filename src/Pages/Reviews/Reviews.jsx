import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import fetchData from "../../Utilities/fetchData";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";


const Reviews = () => {

    const {id} = useParams();
    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        fetchData(`movie/${id}/reviews?language=en-US&page=1`)
        .then(data => {
            setReviews(data?.results);
        })
    },[id]);


  return (
    <section>
        {
            reviews?.map((review)=> (
                <ReviewCard key={review?.id}  review={review}/>
            ))
        }
    </section>
  )
}

export default Reviews