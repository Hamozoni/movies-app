import { useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { useParams } from "react-router-dom";


const BackdropsCard = ({drop})=> {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}original${drop?.file_path}`
    return (
        <div className="b-card">
            <div className="b-image-cont">
                <img src={imageUrl} alt="backdrop" />
            </div>
            <div className="b-info">
                <div className="b-header">
                    <span>info</span>
                    <LockOpenRoundedIcon />
                </div>
            </div>
        </div>
    )
};

const Backdrops = ({mediaType}) => {

    const [backdrops,setBackdrops] = useState({});
    const [backdropsLang,setBackdropsLang] = useState([]);
    const [selectedLang,setSelectedLang] = useState('null');

    const {id} = useParams()


    useEffect(()=> {
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setBackdrops(Object.groupBy(data?.backdrops,e=> e.iso_639_1));
            console.log(Object.groupBy(data?.backdrops,e=> e.iso_639_1))
        })
        fetchData(`configuration/languages`)
        .then(lang=> {
            setBackdropsLang(lang);
            console.log(lang)
        })
    },[mediaType,id]);


  return (
    <div className="backdrops">
        <div className="backdrop-container">
            <nav className="back-nav">
                <header>
                    <h4>backdrops</h4>
                </header>
                <ul>
                    {
                        Object.keys(backdrops)?.map((key)=>(
                            <li>
                                { key === 'null' ? 
                                  'no language' :
                                   backdropsLang?.find(e=> e.iso_639_1 === key)?.english_name
                            }</li>
                        ))
                    }
                </ul>
            </nav>
            <div className="back-content">
                {
                    backdrops[selectedLang]?.map((drop)=> (
                        <BackdropsCard key={drop} drop={drop} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Backdrops