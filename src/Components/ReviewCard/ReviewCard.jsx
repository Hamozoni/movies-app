
import "./ReviewCard.scss";
import autherImg from "../../Images/person.png";

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
                   a review by  {review?.author_details?.name}
                 </h4>
                 <div className="date-rate">
                     <div className="rate">
                        {review?.author_details?.rating}
                     </div>
                      <p className="wrettin">
                         wrettin by {review?.author}
                      </p>
                      <span className="date">
                        {/* on {new Date(review?.updated_at)} */}
                      </span>
                 </div>
             </div>
        </header>
        <div className="review-content">
            <aside className="review">
                {review?.content}
            </aside>
        </div>

    </div>
  )
}

export default ReviewCard