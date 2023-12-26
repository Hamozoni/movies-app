
import "./MovieTvCover.scss";

const MovieTvCover = ({details})=> {

    const imageUrl = process.env.REACT_APP_BASE_URL + 'original'  + details?.backdrop_path;
    const linearGrad = 'linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)' 


    return (
        <section 
            className="cover" 
            style={{backgroundImage: `${linearGrad},url(${imageUrl})`}}>
            <div className="cover-container">
                <div className="cover-image">
                    <img src={process.env.REACT_APP_BASE_URL + 'w300' + details?.poster_path} alt="" />
                </div>
                <div className="cover-content">
                    <div className="title"></div>
                    <div className="links"></div>
                    <div className="overview"></div>
                    <div className="cr"></div>
                </div>
            </div>
        </section>
    );
};

export default MovieTvCover;