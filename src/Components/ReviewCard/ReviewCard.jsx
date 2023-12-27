
import "./ReviewCard.scss";

const ReviewCard = ({review})=> {
  return (
    <div className="review-card">
        <header className="review-header">
             <div className="img">
                <img src={process.env.REACT_APP_BASE_URL + "original" + review?.author_details?.avatar_path} alt={review?.author} />
             </div>
             <div className="rev-titles">
                 <h4 className="name"></h4>
                 <div className="date-rate">
                     <div className="rate"></div>
                      <p className="wrettin"></p>
                      <span className="date">
                      </span>
                 </div>
             </div>
        </header>
        <div className="review-content">
            <aside className="review">

            </aside>
        </div>

    </div>
  )
}

export default ReviewCard