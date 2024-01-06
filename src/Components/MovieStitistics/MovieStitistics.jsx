// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useEffect, useState } from 'react';
import fetchData from '../../Utilities/fetchData';

import facebook_id from '../../Images/facebook.jpg';
import wikidata_id from '../../Images/home.png';
import imdb_id from '../../Images/imbd.png';
import instagram_id from '../../Images/insta.jpg';
import twitter_id from '../../Images/twiter.webp';

import "./MovieStitistics.scss"
import { useNavigate } from 'react-router-dom';

const images = {
  facebook_id,
  wikidata_id,
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
      setKeywords(data?.keywords);
      console.log(data)
    })
    fetchData(`${type}/${id}/external_ids`)
    .then((data)=>{
      setExternalIds(data);
      console.log(data)
    })
   
  },[id,type]);

  const navigate = useNavigate();

  return (
    <section className="movie-stits">
        <div className="stits-container">
            <nav className="stits-nav">
              {
                externalIds &&
                Object?.entries(externalIds)?.map((ids)=> (
                  ids[0] !== 'id' && 
                  <a 
                    className='social-links'
                    href={`https://${ids[0].replace('_id','.com')}/${ids[1]}`} 
                    target='_blank'
                    >
                     <img src={images[ids[0]]} alt="" />
                  </a>
                ))
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
            <section className="score"></section>
            <section className="top-contrib"></section>

            <footer className="stitis-footer">

            </footer>

        </div>
    </section>
  )
};

export default MovieStitistics;
