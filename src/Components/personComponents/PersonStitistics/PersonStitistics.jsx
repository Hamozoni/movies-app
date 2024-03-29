
import "./PersonStitistics.scss";

import facebook_id from '../../../assets/facebook.png';
import instagram_id from '../../../assets/insta.png';
import twitter_id from '../../../assets/twiter.png';
import tiktok_id from '../../../assets/tiktok.png';
import youtube_id from '../../../assets/youtube.png';
import { useContext, useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import { languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";


const images = {
    facebook_id,
    instagram_id,
    twitter_id,
    youtube_id,
    tiktok_id
}


const PersonStitistics = ({details}) => {

    const [externalIds,setExternalIds] = useState(null);
    const [error,setEror] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const {lang,theme} = useContext(globalContext);
    const {id} = useParams();

    const fetchExternalIds = ()=> {

        setIsPending(true);
        setEror(null);

        fetchData(`person/${id}/external_ids`)
        .then((data)=> {
            setExternalIds(data);
        })
        .catch((error)=> {
            setEror(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    }

    useEffect(fetchExternalIds,[id]);

  const alowedSocialMedia = ['instagram_id' , 'facebook_id', 'twitter_id', 'youtube_id','tiktok_id']

  return (
    <section className="person-stitis b-b">
        <nav className="pers-stit-nav">

            {
                isPending ? <Loading width='100%' height='60px' /> 
                : externalIds ?
                alowedSocialMedia?.map((social)=> (
                    (externalIds && externalIds[social] !== null && externalIds[social]) &&
                    <a 
                        key={social}
                        className='social-links'
                        href={`https://${social?.replace('_id','.com')}/${social === 'tiktok_id' ? '@' : ''}${externalIds[social]}`} 
                        target='_blank'
                        rel="noreferrer"
                        >
                        <span className="social-image image-hover">
                            <img src={images[social]} alt="social icon"  />
                        </span>
                </a>
                ))
            : error && <Error error={error} height='60px' onClick={fetchExternalIds} />
            }
              {
                details?.homepage && 
                <a 
                    className='social-links'
                    href={details?.homepage} 
                    target='_blank'
                    rel="noreferrer"
                    >
                    <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg' alt='home'/>
              </a>
              }
        </nav>
        <h3 className={`name t-color-${theme}`}>
            {languages[lang]?.personalInfo}
        </h3>
        <ul className="personal-info">
            <li>
                <h4 className={`name t-color-${theme}`}>
                    {languages[lang]?.knownFor}
                </h4>
                <h6 className={`name t-color-${theme}-2`}>
                    {details?.known_for_department}
                </h6>
            </li>
            <li>
                <h4 className={`name t-color-${theme}`}>
                    {languages[lang]?.knownCredits}
                </h4>
                <h6 className={`name t-color-${theme}-2`}>
                     {details?.popularity}
                </h6>
            </li>
            <li>
                <h4 className={`name t-color-${theme}`}>
                    {languages[lang]?.gender}
                </h4>
                <h6 className={`name t-color-${theme}-2`}>
                    {details?.gender === 1 ? "femal" : "male" }
                </h6>
            </li>
            <li>
                <h4 className={`name t-color-${theme}`}>
                    {languages[lang]?.birthday}
                </h4>
                <h6 className={`name t-color-${theme}-2`}> 
                    {`${new Date(details?.birthday)?.toDateString()} (${new Date().getFullYear() - new Date(details?.birthday)?.getFullYear()} years old)`}
                </h6>
            </li>
            <li>
                <h4 className={`name t-color-${theme}`}>
                    {languages[lang]?.placeOfBirth}
                </h4>
                <h6 className={`name t-color-${theme}-2`}>
                    {details?.place_of_birth}
                </h6>
            </li>
        </ul>
        <section className="kn-for" >
            <h4 className={`for name t-color-${theme}`}>
                {languages[lang]?.alsoKnownAs}
            </h4>
            <ul className="kn-for-ul">
                {
                    details?.also_known_as?.map((key)=>(
                        <li key={key} className={`t-color-${theme}-3`}>
                            {key}
                        </li>
                    ))
                }
            </ul>
        </section>
    </section>
  )
}

export default PersonStitistics
