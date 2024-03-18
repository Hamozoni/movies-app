import { Link } from "react-router-dom"
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


    const fetchImages = ()=> {

        setError(null);
        setIsPending(true);
        fetchData(`tv/${episode?.show_id}/season/${episode?.season_number}/episode/${episode?.episode_number}/images`)
        .then(data=> {
            setImages(data?.stills);
            setIsPending(false);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        })
    }

    useEffect(fetchImages,[episode?.episode_number]);

  return (
        <div className="epis-more-info">
            <nav className="epis-nav">
                <ul className="epis-nav-ul">
                    <li>videos</li>
                    <li>images</li>
                    <li>changes</li>
                    <li>report</li>
                    <li>edit</li>
                </ul>
            </nav>
            <div className="epis-crew-guest">
                <section className='ep-crew'>
                    <h4>crew {episode?.crew?.length}</h4>
                    <div className="ep-crew-box">
                        <p>Directed by :<span>{episode?.crew?.find(e=> e.job === 'Director')?.original_name}</span></p>
                        <p>Written by :<span>{episode?.crew?.find(e=> e.job === 'Writer')?.original_name}</span></p>
                    </div>
                </section>
                <section className='ep-guest'>
                    <nav className="ep-g-nav">
                        <h4>guest starts {episode?.guest_stars?.length}</h4>
                        <Link >full cast&crew</Link>
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
                    <h4 className="ep-img-t">episode images</h4>
                    <Link >view all episode images</Link>
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
                        : error && <Error error={error} height='100%' onClick={fetchImages} />
                    }
                </div>
            </section>
        </div>
  )
}

export default EpisodeInfo