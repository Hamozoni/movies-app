import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import fetchData from "../../Utilities/fetchData";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";

import WestIcon from '@mui/icons-material/West';


const Reviews = () => {

    const {id} = useParams();
    const [reviews,setReviews] = useState([]);

    useEffect(()=>{
        fetchData(`movie/${id}/reviews?language=en-US&page=1`)
        .then(data => {
            setReviews(data?.results);
            console.log(data.results)
        })
    },[id]);


  return (
    <section className="reviews">
        <header className="rev-header">
             <div className="head-container">
                <div className="image-box">
                    <img src="" alt="" />
                </div>
                <div className="titles">
                    <h4 className="mov-name">

                    </h4>
                    <Link>
                       <span><WestIcon /></span>
                       back to main
                   </Link>
                </div>
             </div>
        </header>
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