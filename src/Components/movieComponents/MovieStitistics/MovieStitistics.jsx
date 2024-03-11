// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useEffect, useState } from 'react';


import "./MovieStitistics.scss"
import { useNavigate } from 'react-router-dom';
import fetchData from '../../../utilities/fetchData';

import facebook_id from '../../../Images/facebook.png';
import imdb_id from '../../../Images/imdb.png';
import instagram_id from '../../../Images/insta.png';
import twitter_id from '../../../Images/twiter.png';

const images = {
  facebook_id,
  imdb_id,
  instagram_id,
  twitter_id
}


const MovieStitistics = ({id,details,type}) => {
     
  const [keywords,setKeywords] = useState();
  const [externalIds,setExternalIds] = useState();

  useEffect(()=>{
    fetchData(`${type}/${id}/keywords`)
    .then((data)=>{
      setKeywords(data?.keywords || data?.results );
      console.log(details);
    })
    fetchData(`${type}/${id}/external_ids`)
    .then((data)=>{
      setExternalIds(data);
      console.log(data)
    })
   
  },[id,type]);

  const navigate = useNavigate();

  const alowedSocialMedia = ['instagram_id' , 'facebook_id', 'twitter_id', 'youtube_id'];

  return (
    <section className="movie-stits">
        <div className="stits-container">
            <nav className="stits-nav">
            {
                alowedSocialMedia?.map((social)=> (
                    (externalIds && externalIds[social] !== null && externalIds[social]) &&
                    <a 
                        className='social-links'
                        href={`https://${social?.replace('_id','.com')}/${externalIds[social]}`} 
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
            <div className="status">
              <div className="stat">
                  <h4>status</h4>
                  <h5>{details?.status}</h5>
              </div>
              <div className="stat">
                  <h4>original language</h4>
                  <h5>{details?.original_language}</h5>
              </div>
              <div className="stat">
                  <h4>budget</h4>
                  <h5>${ new Intl.NumberFormat().format(details?.budget)}</h5>
              </div>
              <div className="stat">
                  <h4>revenue</h4>
                  <h5>${new Intl.NumberFormat().format(details?.revenue)}</h5>
              </div>

            </div>
            <section className="keywords">
              <h4 className='key-t'>keywords</h4>
            
              <ul className="keywords-ul">
                 {
                  keywords?.map((key)=>(
                    <li 
                      onClick={()=> navigate(`/keywords/${key?.id}`)}
                      key={key?.id} 
                      className="key"
                      >
                        {key?.name}
                    </li>
                  ))
                 }
              </ul>

            </section>
            <section className="score">
               <h5 className='sc-t'>content score</h5>
               <div className="sc-box">
                   <h5 className='sc-per'>100</h5>
                   <p>Yes! Looking good!</p>
               </div>
            </section>
            <section className="top-contrib"></section>

            <footer className="stitis-footer">

            </footer>

        </div>
    </section>
  )
};

export default MovieStitistics;
