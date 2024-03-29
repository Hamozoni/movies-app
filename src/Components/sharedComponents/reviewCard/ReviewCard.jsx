
import "./ReviewCard.scss";
import autherImg from "../../../assets/person.jpg";
import fitLongString from "../../../utilities/fitLongString";
import { useContext } from "react";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { languages } from "../../../utilities/languages";

const ReviewCard = ({review})=> {

  const {theme,lang} = useContext(globalContext);
  return (
    <div className="review-card card">
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
                 <h4 className={`name t-color-${theme}`}>
                  { languages[lang].aReviewBy} {review?.author}
                 </h4>
                 <div className="date-rate">
                     <div className="rate">
                        {review?.author_details?.rating}
                     </div>
                      <p className={`wrettin t-color-${theme}-2`}>
                         {languages[lang].wrettinBy} {review?.author}
                      </p>
                      <span className={`date t-color-${theme}-2`}>
                         on {review?.updated_at && new Date(review.updated_at)?.toDateString()}
                      </span>
                 </div>
             </div>
        </header>
        <div className="review-content">
            <aside className={`review t-color-${theme}-2`}>
                {fitLongString(review?.content,400) }
            </aside>
        </div>

    </div>
  )
}

export default ReviewCard