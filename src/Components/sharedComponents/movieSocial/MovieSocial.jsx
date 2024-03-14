import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import "./MovieSocial.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import ReviewCard from "../../sharedComponents/reviewCard/ReviewCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MovieSocial = ({id,section,mediaType})=> {

    const [reviews,setReviews] = useState([]);
    const [activeSection,setActiveSection] = useState('reviews');
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const {lang} = useContext(globalContext);

    useEffect(()=>{
        setIsPending(true);
        fetchData(`${mediaType}/${id}/${section}?language=${lang}&page=1`)
        .then((data)=>{
            setReviews(data?.results);
            setIsPending(false);
            setError(null);
            console.log(data)
        })
        .catch(error=> {
            setIsPending(false);
            setError(error);
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
        {
            isPending ? <Loading width='100%' height='300px'/> :
            reviews ?
            <div className="social-content">
                { 
                activeSection === 'reviews' ?
                reviews?.length > 0 ?
                    <ReviewCard review={reviews[0]} />
                    : <p>We don't have any {activeSection} for .... Would you like to write one?</p>
                : ''
                }
            </div>
            : error && <Error error={error}/>
        }
        
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