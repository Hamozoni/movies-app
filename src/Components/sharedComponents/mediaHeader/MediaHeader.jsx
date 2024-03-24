import { useContext } from "react"
// import fetchData from "../../../utilities/fetchData";
import { Link} from "react-router-dom";

import WestIcon from '@mui/icons-material/West';

import "./mediaHeader.scss";
// import Loading from "../../loading/Loading";
// import Error from "../../error/Error";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";

const MediaHeader = ({imageUrl,title,navigateTo,linkTitle,year=null}) => {

    // const [details,setDetails] = useState(null);
    // const [isPending,setIsPending] = useState(true);
    // const [error,setError] = useState(null);

    const {color} = useContext(mediaColorContext);
    // const urlQuery = useLocation().pathname?.split('/')

    // const fetchDetails = ()=>{

    //     setIsPending(true);
    //     setError(null);

    //     fetchData(`${mediaType}/${id}?language=en-US`)
    //     .then((data)=> {
    //         setDetails(data);
    //         setIsPending(false);
    //         console.log();

    //         document.title = `${mediaType  === 'tv' ? data?.name : data?.title}-${urlQuery[urlQuery.length - 1]}`
    //     })
    //     .catch(error=> {
    //         setError(error);
    //         setIsPending(false);
    //     })
    // }


    // useEffect(fetchDetails,[id]);


  return (

    <header 
        className="main-t-header" 
        style={{backgroundColor: color.backColor}}>
            <div className="media-details">
                <div className="media-image">
                    <img 
                        loading="lazy"
                        src={process.env.REACT_APP_BASE_URL + 'w200' + imageUrl}
                        alt="" 
                        />

                </div>
                <div className="media-back-to">
                    <h3
                        style={{color:color.textColor}}
                         className="name" >
                               { title}{year ? `(${new Date(year)?.getFullYear()})` : ''}
                    </h3>
                    <Link 
                        style={{color:color.textColor}}
                        to={navigateTo} 
                        className="back-to"> 
                        <WestIcon /> {linkTitle}
                    </Link>
                </div>
            </div>
    </header>
    )
}

export default MediaHeader;
