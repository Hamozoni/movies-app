import {useParams } from "react-router-dom"

import "./Main.scss";
import { useContext} from "react";
import MovieTvCover from "../../Components/movieComponents/movieTvCover/MovieTvCover";
import MovieSocial from "../../Components/sharedComponents/movieSocial/MovieSocial";
import Media from "../../Components/sharedComponents/mediaImages/Media";
import Recommendations from "../../Components/sharedComponents/recommendations/Recommendations";
import MovieStitistics from "../../Components/movieComponents/movieStitistics/MovieStitistics";
import TopBilledCast from "../../Components/sharedComponents/topBilledCast/TopBilledCast";
import { MovieDetailsContext } from "../../Layouts/MovieLayout";



const Main = ()=> {

    const {details} = useContext(MovieDetailsContext);
    const  {id} = useParams();
 

    return (
            <div className="movie-container">
                
               <MovieTvCover details={details} mediaType='movie'/>

                <section className="movie-content">
                    <div className="left-content">
                        <TopBilledCast mediaType='movie' id={id} title='Series Top Billed Cast'/>
                        <MovieSocial section='reviews' mediaType='movie'/>
                        <Media id={id} mediaType='movie' />
                        <Recommendations id={id} mediaType='movie'/>
                    </div>
                    <div className="right-content">
                        <MovieStitistics id={id} details={details}  type='movie' />
                    </div>

                </section>
            </div>
    )
};

export default Main;