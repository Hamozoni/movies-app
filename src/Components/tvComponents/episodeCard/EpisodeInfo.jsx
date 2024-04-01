import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import fetchData from "../../../utilities/fetchData";

import CrewCard from "../../sharedComponents/crewCard/CrewCard";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

import "./episodeInfo.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import {languages} from "../../../utilities/languages";

const EpisodeInfo = ({episode}) => {

    const {lang,theme} = useContext(globalContext);

    const{id,seasonNumber} = useParams();

    const [images,setImages] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const routsLink = `tv/${id}/season/${seasonNumber}/episode/${episode?.episode_number}`;

    const fetchImages = ()=> {

        setError(null);
        setIsPending(true);
        fetchData(`${routsLink}/images`)
        .then(data=> {
            setImages(data?.stills);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetchImages,[routsLink]);

  return (
        <div className="epis-more-info">
            <nav className="epis-nav">
                <ul className="epis-nav-ul">
                    <li>
                        <Link 
                            className='link-color'
                            to={`/${routsLink}/videos`}
                            >
                            {languages[lang].videos}
                        </Link>
                    </li>
                    <li>
                        <Link  className='link-color' to={`/${routsLink}/stills`}>
                            {lang === 'en' ? 'images' : 'الصور'}
                        </Link>
                    </li>
                    <li>
                        <Link  className='link-color' to={`/${routsLink}/changes`}>
                            {languages[lang].changes}
                        </Link>
                    </li>
                    <li>
                        <Link  className='link-color' to={`/${routsLink}`}>
                            {languages[lang].report}
                        </Link>
                    </li>
                    <li>
                        <Link  className='link-color' to={`/${routsLink}`}>
                            {languages[lang].edit}
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="epis-crew-guest">
                <section className='ep-crew'>
                    <h4 className={`t-color-${theme} ep-t`}>
                        {lang === 'en' ? 'crew' : 'طاقم العمل'} {episode?.crew?.length}
                    </h4>
                    <div className="ep-crew-box">
                        <p className={`t-color-${theme}-2`}>
                            <strong>Directed by :</strong>
                            <span>
                                {episode?.crew?.find(e=> e.job === 'Director')?.original_name || "No director has been added."}
                            </span>
                        </p>
                        <p className={`t-color-${theme}-2`}>
                             <strong>Written by :</strong>
                             <span>
                                {episode?.crew?.find(e=> e.job === 'Writer')?.original_name || " No writer has been added."}
                            </span>
                        </p>
                    </div>
                </section>
                <section className='ep-guest'>
                    <nav className="ep-g-nav">
                        <h4 className={`t-color-${theme}-2 ep-t`}>
                            {lang === 'en' ? 'guest starts' : 'النجوم ضيوف المسلسل'} 
                            {episode?.guest_stars?.length}
                        </h4>
                        <Link 
                            to={`/${routsLink}/castCrew`}
                            className="ep-link link-color"
                             >
                                {languages[lang].allCrew}
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
                    <h4 className={`t-color-${theme}-2 ep-t`} >
                        {lang === 'en' ? 'episode images' : 'صور الحلقة'} {images?.length}
                    </h4>
                    <Link 
                        to={`/${routsLink}/stills`}
                        className="ep-link link-color" 
                        >
                           {lang === 'en' ? 'view all episode images' : 'عرض كل صور الحلقة'}
                    </Link>
                </nav>
                <div className="ep-images-box">
                    {
                         isPending ? <Loading width='100%' height='100%' /> 
                         : images ?
                            images?.map((image)=> (
                                <img 
                                    key={image?.file_path}
                                    src={process.env.REACT_APP_BASE_URL + 'original' + image?.file_path}
                                    alt="episode images"
                                    />
                            ))
                            : images.length === 0 ? 
                              <p className={`t-color-${theme}-2`}>
                                  {lang === 'en' ? 'No episode images have been added.' : 'لم يتم إضافة صور للحلقة'}
                              </p>
                            : error && <Error error={error} height='100%' onClick={fetchImages} />
                    }
                </div>
            </section>
        </div>
  )
}

export default EpisodeInfo