// import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import { useEffect, useState } from 'react';
import fetchData from '../../Utilities/fetchData';

import facebook_id from '../../Images/insta.jpg';


const MovieStitistics = ({id,details}) => {
     
  const [keywords,setKeywords] = useState();
  const [externalIds,setExternalIds] = useState();

  useEffect(()=>{
    fetchData(`movie/${id}/keywords`)
    .then((data)=>{
      setKeywords(data?.keywords);
      console.log(data)
    })
    fetchData(`movie/${id}/external_ids`)
    .then((data)=>{
      setExternalIds(data);
      console.log(data)
    })
   
  },[id]);

  return (
    <section className="movie-stits">
        <div className="stits-container">
            <nav className="stits-nav">
              {
                externalIds?.length &&
                Object?.entries(externalIds)?.map((ids)=> (
                  ids[0] !== 'id' && 
                  <a href={`https://${ids[0].replace('_id','.com')}/${ids[1]}`} target='_blank'>
                     <img src={facebook_id} alt="" />
                  </a>
                ))
              }
              {/* <a href={}></a> */}

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
                  <h5>{details?.budget}</h5>
              </div>
              <div className="stat">
                  <h4>revenue</h4>
                  <h5>{details?.revenue}</h5>
              </div>

            </div>
            <section className="keywords">
              <h4>keywords</h4>
            
              <ul className="keywords-ul">
                 {
                  keywords?.map((key)=>(
                    <li key={key?.id} className="key">
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
