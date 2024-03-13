import { useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import { useParams } from "react-router-dom";

import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckIcon from '@mui/icons-material/Check';

import "./backdrops&posters.scss";


const BackdropsCard = ({drop,language})=> {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}original${drop?.file_path}`
    return (
        <div className="b-card scale">
            <div className="b-image-cont">
                <img className="image-hover" src={imageUrl} alt="backdrop" />
            </div>
            <div className="b-info">
                <header className="b-header">
                    <span>info</span>
                    <LockOpenRoundedIcon />
                </header>
                <div className="b-body">
                    <div className="size">
                        <p>size</p>
                        <p>{drop?.width}×{drop?.height} <CheckIcon /></p>
                    </div>
                    <div className="b-lang">
                        <p>language</p>
                        <p>{language}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Backdrops_posters = ({mediaType,type}) => {

    const [data,setData] = useState({});
    const [dataLang,setDataLang] = useState([]);
    const [selectedLang,setSelectedLang] = useState('null');

    const {id} = useParams()


    useEffect(()=> {
        fetchData(`${mediaType}/${id}/images`)
        .then((data)=>{
            setData(Object.groupBy(data[type],e=> e.iso_639_1));
            console.log(Object.groupBy(data[type],e=> e.iso_639_1))
            setSelectedLang(Object.keys(Object.groupBy(data[type],e=> e.iso_639_1))[0])
        })
        fetchData(`configuration/languages`)
        .then(lang=> {
            setDataLang(lang);
            console.log(lang)
        })
        
    },[mediaType,id,type]);


  return (
    <div className="backdrops">
        <div className="backdrop-container">
            <nav className="back-nav card">
                <header className="b-header">
                    <h4>{type}</h4>
                </header>
                <ul className="lang-ul">
                    {
                        Object.keys(data)?.map((key)=>(
                            <li onClick={()=> setSelectedLang(key)} className={`${selectedLang === key && 'active'} nav-btn`}>
                                { key === 'null' ? 
                                  'no language' :
                                   dataLang?.find(e=> e.iso_639_1 === key)?.english_name
                                }
                                <span>{data[key]?.length}</span>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className="back-content">
                {
                    data[selectedLang]?.map((drop)=> (
                        <BackdropsCard 
                            key={drop} 
                            drop={drop} 
                            language={dataLang?.find(e=> e.iso_639_1 === drop.iso_639_1)?.english_name || 'no laguage' }
                            />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Backdrops_posters;