
import axios from "axios";

export const  fetchData = async  (endPoint)=> {
    
const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/${endPoint}`,
        headers: {
            accept: 'application/json',
            Authorization : 'Bearer' + ' ' + process.env.REACT_APP_ACCESS_TOKEN
        }
    };

    const {data} = await axios.request(options)

    return data;
};

export default fetchData;