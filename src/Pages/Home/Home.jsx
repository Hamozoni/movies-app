import SearchBar from "../../Components/HomeSearchBar/SearchBar";
import Trending from "../../Components/Trending/Trending";

const Home = ()=> {

    return (
        <main className="home">
            <div className="home-container">
                <SearchBar />
                <Trending />
            </div>
        </main>
    );
};

export default Home;