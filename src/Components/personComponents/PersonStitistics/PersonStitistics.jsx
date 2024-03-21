
import "./PersonStitistics.scss";

import facebook_id from '../../../assets/facebook.png';
import instagram_id from '../../../assets/insta.png';
import twitter_id from '../../../assets/twiter.png';
import tiktok_id from '../../../assets/tiktok.png';
import youtube_id from '../../../assets/youtube.png';
import { useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";


const images = {
    facebook_id,
    instagram_id,
    twitter_id,
    youtube_id,
    tiktok_id
}


const PersonStitistics = ({details}) => {

    const [externalIds,setExternalIds] = useState();

    useEffect(()=> {
        fetchData(`person/${details?.id}/external_ids`)
        .then((data)=> {
            setExternalIds(data);
            console.log(data)
        })
    },[details]);

    const alowedSocialMedia = ['instagram_id' , 'facebook_id', 'twitter_id', 'youtube_id','tiktok_id']

  return (
    <section className="person-stitis">
        <nav className="pers-stit-nav">

            {
                alowedSocialMedia?.map((social)=> (
                    (externalIds && externalIds[social] !== null && externalIds[social]) &&
                    <a 
                        className='social-links'
                        href={`https://${social?.replace('_id','.com')}/${social === 'tiktok_id' ? '@' : ''}${externalIds[social]}`} 
                        target='_blank'
                    >
                     <img src={images[social]} />
                  </a>
                ))
            }
              {
                details?.homepage && 
                <a 
                    className='social-links'
                    href={details?.homepage} 
                    target='_blank'
                    >
                    <img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg'/>
              </a>
              }
        </nav>
        <h3>personal info</h3>
        <ul className="personal-info">
            <li>
                <h4>Known For</h4>
                <h6>{details?.known_for_department}</h6>
            </li>
            <li>
                <h4>Known Credits</h4>
                <h6> {details?.popularity}</h6>
            </li>
            <li>
                <h4>Gender</h4>
                <h6>{details?.gender === 1 ? "femal" : "male" }</h6>
            </li>
            <li>
                <h4>Birthday</h4>
                <h6> {`${new Date(details?.birthday)?.toDateString()} (${new Date().getFullYear() - new Date(details?.birthday)?.getFullYear()} years old)`}</h6>
            </li>
            <li>
                <h4>Place of Birth</h4>
               <h6> {details?.place_of_birth}</h6>
            </li>
        </ul>
        <section className="kn-for">
            <h4 className="for">also known as</h4>
            <ul className="kn-for-ul">
                {
                    details?.also_known_as?.map((key)=>(
                        <li key={key}>{key}</li>
                    ))
                }
            </ul>
        </section>
    </section>
  )
}

export default PersonStitistics
