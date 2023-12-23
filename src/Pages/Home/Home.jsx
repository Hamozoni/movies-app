import { useEffect } from "react";
import fetchData from "../../Utilities/fetchData.js";



const Home = ()=> {

    useEffect(()=>{
        fetchData('trending/movie/day?language=ar&page=4')
        .then((data)=>{
            console.log(data);
        })
    },[]);

    return (
        <main className="home">

        </main>
    );
};

export default Home;