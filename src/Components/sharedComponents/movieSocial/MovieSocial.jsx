import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import "./MovieSocial.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import ReviewCard from "../../sharedComponents/reviewCard/ReviewCard";

const MovieSocial = ({id,section,mediaType})=> {

    const [reviews,setReviews] = useState([]);
    const [activeSection,setActiveSection] = useState('reviews');

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
        <header className="social-header">
            <h4 className="social-title">
                social
            </h4>
            <nav className="social-nav">
                <h5 
                    className={activeSection === 'reviews' ? 'active nav-btn' : ' nav-btn'}
                    onClick={()=> setActiveSection('reviews')}
                    >
                        reviews {reviews?.length}
                </h5>
                <h5
                    className={activeSection === 'discussions' ?  'active nav-btn' : ' nav-btn'}
                    onClick={()=> setActiveSection('discussions')}
                >discussions </h5>
            </nav>
        </header>
        <div className="social-content">
            { 
               activeSection === 'reviews' ?
               reviews?.length > 0 ?
                  <ReviewCard review={reviews[0]} />
                  : <p>We don't have any {activeSection} for .... Would you like to write one?</p>
               : ''
            }
        </div>
        
        <Link to={`/${mediaType}/${id}/${activeSection}`} className="read-all"> 
            {
            reviews.length > 0 && 
              `read all ${activeSection}`
            }
            
        
        </Link>
    </section>
  )
}

export default MovieSocial