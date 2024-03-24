import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"


import "./MovieSocial.scss";
import fetchData from "../../../utilities/fetchData";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import ReviewCard from "../../sharedComponents/reviewCard/ReviewCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const MovieSocial = ({section,mediaType})=> {

    const {id} = useParams();

    const [reviews,setReviews] = useState(null);
    const [activeSection,setActiveSection] = useState('reviews');
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const {lang} = useContext(globalContext);

    const fetch = ()=>{
        setIsPending(true);
        setError(null);
        fetchData(`${mediaType}/${id}/${section}?language=${lang}&page=1`)
        .then((data)=>{
            setReviews(data?.results);
            setIsPending(false);
            console.log(data)
        })
        .catch(error=> {
            setIsPending(false);
            setError(error);
        })
    }

    useEffect(fetch,[id,lang,section,mediaType]);

  return (
    <section className="Movie-social">
        <header className="social-header">
            <h4 className="social-title">
                social
            </h4>
            <ul className="social-nav">
                <li
                    className={activeSection === 'reviews' ? 'active nav-btn' : ' nav-btn'}
                    onClick={()=> setActiveSection('reviews')}
                    >
                        reviews {reviews?.length}
                </li>
                <li
                    className={activeSection === 'discussions' ?  'active nav-btn' : ' nav-btn'}
                    onClick={()=> setActiveSection('discussions')}
                >discussions 
                </li>
            </ul>
        </header>
        {
            isPending ? <Loading width='100%' height='300px'/> :
            reviews ?
            <div className="social-content">
                { 
                activeSection === 'reviews' ?
                reviews?.length > 0 ?
                    <ReviewCard review={reviews[0]} />
                    : <p className="no-result"> We don't have any {activeSection} for .... Would you like to write one?</p>
                : ''
                }
            </div>
            : error && <Error error={error} height='300px' onClick={fetch}/>
        }
        {
            reviews &&
            <Link to={`/${mediaType}/${id}/${activeSection}`} className="read-all-review link-hover"> 
                {
                reviews.length > 0 && 
                `read all ${activeSection}`
                }
                
            
            </Link>
        }
    </section>
  )
}

export default MovieSocial