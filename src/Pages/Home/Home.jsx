import { useEffect } from "react";
import FreeToWatch from "../../Components/homeComponents/freeToWatch/FreeToWatch";
import SearchBar from "../../Components/homeComponents/homeSearchBar/SearchBar";
import LatestTrailer from "../../Components/homeComponents/latestTrailer/LatestTrailer";
import Trending from "../../Components/homeComponents/trending/Trending";


const Home = ()=> {

    useEffect(()=> {
        document.title = 'Home-Myh Movie ';
    },[])

    return (
        <main className="home">
            <div className="home-container">
                <SearchBar />
                <Trending type='movie' />
                <LatestTrailer />
                <FreeToWatch />
                <Trending type='tv'/>
            </div>
        </main>
    );
};

export default Home;