

const MediaHeader = ({details}) => {
  return (
        <header className="main-t-header">
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'w200' + seasons?.poster_path}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3 className="name">
                        {`${seasons?.name} (${new Date(seasons?.first_air_date)?.getFullYear()})`}
                    </h3>
                    <Link to={`/tv/${id}`} className="back-to"> 
                        <WestIcon /> back to main
                    </Link>
                </div>
            </div>
        </header>
  )
}

export default MediaHeader