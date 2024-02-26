
import "./PersonStitistics.scss";

import facebook_id from '../../Images/facebook.png';
import wikidata_id from '../../Images/home.png';
import imdb_id from '../../Images/imdb.png';
import instagram_id from '../../Images/insta.png';
import twitter_id from '../../Images/twiter.png';
import homePage from '../../Images/home.png';
import { useEffect, useState } from "react";
import fetchData from "../../Utilities/fetchData";

const images = {
    facebook_id,
    wikidata_id,
    imdb_id,
    instagram_id,
    twitter_id
  }

const PersonStitistics = ({details}) => {

    const [externalIds,setExternalIds] = useState();

    useEffect(()=> {
        fetchData(`person/${details?.id}/external_ids`)
        .then((data)=> {
            setExternalIds(data);
        })
    },[details]);

  return (
    <section className="person-stitis">
        <nav className="pers-stit-nav">
        {
                externalIds &&
                Object?.entries(externalIds)?.map((ids)=> (
                  (ids[0] !== 'id' && ids[1] !== null ) && 
                  <a 
                    className='social-links'
                    href={`https://${ids[0].replace('_id','.com')}/${ids[1]}`} 
                    target='_blank'
                    >
                     <img src={images[ids[0]]} alt={ids[0]}/>
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
                    <img src={homePage}/>
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
