import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';

const MovieStitistics = ({details}) => {
  return (
    <section className="movie-stits">
        <div className="stits-container">
            <nav className="stits-nav">

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
                  <h5>{details?.budget?.toLocalString()}</h5>
              </div>
              <div className="stat">
                  <h4>revenue</h4>
                  <h5>{details?.revenue}</h5>
              </div>

            </div>
            <section className="keywords">
              <h4>keywords</h4>
            
              {/* <ul className="keywords-ul">
                 {
                  keywords?.map((key)=>(
                    <li key={key} className="key">
                        {key}
                    </li>
                  ))
                 }
              </ul> */}

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
