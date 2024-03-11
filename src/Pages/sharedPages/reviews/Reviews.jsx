import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import fetchData from "../../../utilities/fetchData";
import ReviewCard from "../../../Components/sharedComponents/reviewCard/ReviewCard";



const Reviews = ({mediaType}) => {

    const {id} = useParams();
    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        fetchData(`${mediaType}/${id}/reviews?language=en-US&page=1`)
        .then(data => {
            setReviews(data?.results);
            console.log(data)
        })
    },[id]);


  return (
    <section className="reviews">
        <div className="revi-content">
            <div className="rev-cards">

                {
                    reviews?.map((review)=> (
                        <ReviewCard key={review?.id}  review={review}/>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default Reviews