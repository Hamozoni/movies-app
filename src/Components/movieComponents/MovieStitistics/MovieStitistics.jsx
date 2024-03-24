// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useEffect, useState } from 'react';


import "./MovieStitistics.scss"
import { useNavigate } from 'react-router-dom';
import fetchData from '../../../utilities/fetchData';

import facebook_id from '../../../assets/facebook.png';
import imdb_id from '../../../assets/imdb.png';
import instagram_id from '../../../assets/insta.png';
import twitter_id from '../../../assets/twiter.png';
import Error from '../../error/Error';
import Loading from '../../loading/Loading';

const images = {
  facebook_id,
  imdb_id,
  instagram_id,
  twitter_id
}


const MovieStitistics = ({id,details,type}) => {
     
  const [keywords,setKeywords] = useState();
  const [externalIds,setExternalIds] = useState();
  const [isPending2,setIsPending2] = useState(true);
  const [error2,setError2] = useState(null);
  const [isPending,setIsPending] = useState(true);
  const [error,setError] = useState(null);

  const fetch = ()=> {
    setIsPending(true);
    setError(null);
    setIsPending2(true);
    setError2(null);
    fetchData(`${type}/${id}/keywords`)
    .then((data)=>{
      setKeywords(data?.keywords || data?.results );
      setIsPending(false);

      console.log(details);
    })
    .catch(error=> {
      setError(error);
      setIsPending(false);
    });


    fetchData(`${type}/${id}/external_ids`)
    .then((data)=>{
      setExternalIds(data);
      setIsPending2(false);

      console.log(data)
    })
    .catch(error=>{
      setIsPending2(false);
      setError2(error);
    });
  }

  useEffect(fetch,[id,type,details]);

  const navigate = useNavigate();

  const alowedSocialMedia = ['instagram_id' , 'facebook_id', 'twitter_id', 'youtube_id'];

  return (
    <section className="movie-stits">
        <div className="stits-container">
            <nav className="stits-nav">
            {
              isPending2 ? <Loading width='100%' height='65px'/> : 
              externalIds ?
                alowedSocialMedia?.map((social)=> (
                    (externalIds && externalIds[social] !== null && externalIds[social]) &&
                    <a 
                        className='social-links'
                        href={`https://${social?.replace('_id','.com')}/${externalIds[social]}`} 
                        target='_blank'
                        rel="noreferrer"
                    >
                     <img src={images[social]} alt={externalIds[social]} />
                  </a>
                ))
              : error2 && <Error error={error2} height='65px' onClick={fetch} />
            }
            {
            details?.homepage && 
              <a 
                  className='social-links'
                  href={details?.homepage} 
                  target='_blank'
                  rel="noreferrer"
                  >
                  <img 
                      src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg'
                       alt='home page'
                      />
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
              {
                type === 'movie' ? 
                  (<><div className="stat">
                      <h4>budget</h4>
                      <h5>${ new Intl.NumberFormat().format(details?.budget)}</h5>
                  </div>
                  <div className="stat">
                      <h4>revenue</h4>
                      <h5>${new Intl.NumberFormat().format(details?.revenue)}</h5>
                  </div></>)
                  :
                  (<div className="network">
                    <h3 className='net-t'>network</h3>
                    <div className="net-images">
                        {
                           details?.networks?.map((network)=> (
                            <div className='network-image'>
                              <img 
                                   className='image-hover'
                                   src={process.env.REACT_APP_BASE_URL + 'original' + network?.logo_path} 
                                   alt="network"
                                   />
                            </div>
                           ))
                        }
                    </div>
                  </div>)
              }

            </div>
            <section className="keywords">
                <h4 className='key-t'>keywords</h4>
                {
                  isPending ? <Loading width='100%' height='300px' /> : 
                  keywords?.length ? 
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
                  : error && <Error error={error}  height='300px' onClick={fetch} /> 
                }
            

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
