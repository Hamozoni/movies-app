import axios from "axios";

export const  fetchYoutubeData = async  (endPoint)=> {
    
const options = {
    method: 'GET',
    url: `https://youtube-v3-alternative.p.rapidapi.com/${endPoint}`,
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_ACCESS_TOKEN,
            'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com'
          }
    };

    const {data} = await axios.request(options)

    return data
};

export default fetchYoutubeData;