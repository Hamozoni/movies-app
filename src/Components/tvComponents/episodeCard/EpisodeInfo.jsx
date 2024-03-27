import { Link, useParams } from "react-router-dom"
import CrewCard from "../../sharedComponents/crewCard/CrewCard"
import { useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

import "./episodeInfo.scss";


const EpisodeInfo = ({episode}) => {

    const [images,setImages] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const{id,seasonNumber} = useParams();

    const routsLink = `tv/${id}/season/${seasonNumber}/episode/${episode?.episode_number}`

    const fetchImages = ()=> {

        setError(null);
        setIsPending(true);
        fetchData(`${routsLink}/images`)
        .then(data=> {
            setImages(data?.stills);
            setIsPending(false);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        })
    }

    useEffect(fetchImages,[routsLink]);

  return (
        <div className="epis-more-info">
            <nav className="epis-nav">
                <ul className="epis-nav-ul">
                    <li><Link to={`/${routsLink}/videos`}>videos</Link></li>
                    <li><Link to={`/${routsLink}/stills`}>images</Link></li>
                    <li><Link to={`/${routsLink}/changes`}>changes</Link></li>
                    <li><Link to={`/${routsLink}`}>report</Link></li>
                    <li><Link to={`/${routsLink}`}>edit</Link></li>
                </ul>
            </nav>
            <div className="epis-crew-guest">
                <section className='ep-crew'>
                    <h4 className="ep-t">crew {episode?.crew?.length}</h4>
                    <div className="ep-crew-box">
                        <p>
                            <strong>Directed by :</strong>
                            <span>
                                {episode?.crew?.find(e=> e.job === 'Director')?.original_name || "No director has been added."}
                            </span>
                        </p>
                        <p>
                             <strong>Written by :</strong>
                             <span>
                                {episode?.crew?.find(e=> e.job === 'Writer')?.original_name || " No writer has been added."}
                            </span>
                        </p>
                    </div>
                </section>
                <section className='ep-guest'>
                    <nav className="ep-g-nav">
                        <h4 className="ep-t">guest starts {episode?.guest_stars?.length}</h4>
                        <Link 
                            to={`/${routsLink}/castCrew`}
                            className="ep-link link-hover" >
                                full cast&crew
                        </Link>
                    </nav>
                    <div className="ep-guest-box">
                        {
                            episode?.guest_stars?.map((guest)=> (
                                <CrewCard key={guest?.id} person={guest} />
                            ))
                        }
                    </div>
                </section>
            </div>
            <section className="epis-images">
                <nav className="ep-img-nav">
                    <h4 className="ep-t" >episode images {images?.length}</h4>
                    <Link 
                     to={`/${routsLink}/stills`}
                        className="ep-link link-hover" >view all episode images</Link>
                </nav>
                <div className="ep-images-box">


                    {
                         isPending ? <Loading width='100%' height='100%' /> 
                         : images ?
                        images?.map((image)=> (
                            <img 
                                src={process.env.REACT_APP_BASE_URL + 'original' + image?.file_path}
                                alt="episode images"
                                />
                        ))
                        : images.length === 0 ? <p>No episode images have been added.</p>
                        : error && <Error error={error} height='100%' onClick={fetchImages} />
                    }
                </div>
            </section>
        </div>
  )
}

export default EpisodeInfo