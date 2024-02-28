import FreeToWatch from "../../Components/FreeToWatch/FreeToWatch";
import SearchBar from "../../Components/HomeSearchBar/SearchBar";
import LatestTrailer from "../../Components/LatestTrailer/LatestTrailer";
import Trending from "../../Components/Trending/Trending";

const Home = ()=> {

    return (
        <main className="home">
            <div className="home-container">
                <SearchBar />
                <Trending type='movie' />
                <LatestTrailer />
                <FreeToWatch />
                <Trending type='tv'/>
                <Trending type='person'/>
            </div>
        </main>
    );
};

export default Home;