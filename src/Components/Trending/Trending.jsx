import { useEffect } from "react";
import fetchData from "../../Utilities/fetchData";

const Trending = ()=> {

    useEffect(()=>{
        fetchData('trending/movie/day?language=ar&page=4')
        .then((data)=>{
            console.log(data);
        })
    },[]);

    return (
        <div className="trending">

        </div>
    )
}