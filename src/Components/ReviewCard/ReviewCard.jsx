
import "./ReviewCard.scss";
import autherImg from "../../Images/person.png";
import fitLongString from "../../Utilities/fitLongString";

const ReviewCard = ({review})=> {
  return (
    <div className="review-card">
        <header className="review-header">
             <div className="img">
                <img 
                    src={ review?.author_details?.avatar_path ? 
                            process.env.REACT_APP_BASE_URL + 'w300' + review?.author_details?.avatar_path
                            : autherImg
                        }
                     alt={review?.author}
                    />
             </div>
             <div className="rev-titles">
                 <h4 className="name">
                   a review by  {review?.author}
                 </h4>
                 <div className="date-rate">
                     {/* <div className="rate">
                        {review?.author_details?.rating}
                     </div> */}
                      <p className="wrettin">
                         wrettin by {review?.author}
                      </p>
                      <span className="date">
                        on {review?.updated_at && new Date(review.updated_at)?.toDateString()}
                      </span>
                 </div>
             </div>
        </header>
        <div className="review-content">
            <aside className="review">
                {fitLongString(review?.content,400) }
            </aside>
        </div>

    </div>
  )
}

export default ReviewCard