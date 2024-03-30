import { useContext, useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import { useLocation } from "react-router-dom";

import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckIcon from '@mui/icons-material/Check';

import "./backdrops&posters.scss";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { languages } from "../../../utilities/languages";


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
                        <span>size</span>
                        <p>{drop?.width}×{drop?.height} <CheckIcon /></p>
                    </div>
                    <div className="b-lang">
                        <span>language</span>
                        <p>{language}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const BackdropsPosters = ({type}) => {

    const {color} = useContext(mediaColorContext);
    const {languages: languagesList,lang} = useContext(globalContext);

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const [selectedLang,setSelectedLang] = useState('null');

    const pathName = useLocation().pathname;

    const fetchImagesData = ()=> {

        setIsPending(true);
        setError(null);

        fetchData(`${pathName.replace(type,'images')}`)
        .then((data)=>{
            setData(Object.groupBy(data[type],e=> e.iso_639_1));
            setSelectedLang(data[type][0].iso_639_1)
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    };

    useEffect(fetchImagesData,[pathName,type]);


  return (
    <div className="backdrops alt-content">
        {
            isPending ? <Loading width='80%' height='calc(100vh - 100px)' /> 
            : data ?
            <div className="backdrop-container alt-content">
                <nav className="back-nav alt-cout-list">
                    <header 
                        style={{backgroundColor: color.backColor}}
                        className="b-header cout-header">
                        <h4 style={{color: color.textColor}}>
                            {languages[lang][type]}
                        </h4>
                    </header>
                    <ul className="lang-ul cout-list">
                        {
                            Object.keys(data)?.map((key)=>(
                                <li onClick={()=> setSelectedLang(key)} className={`${selectedLang === key && 'active'} nav-btn`}>
                                    { key === 'null' ? 
                                    'no language' :
                                    languagesList?.find(e=> e.iso_639_1 === key)?.english_name
                                    }
                                    <span>{data[key]?.length}</span>
                                </li>
                            )) 
                        }
                    </ul>
                </nav>
                <div className="back-content alt-t-tabels">
                    {
                        data[selectedLang]?.map((drop)=> (
                            <BackdropsCard 
                                key={drop} 
                                drop={drop} 
                                language={languagesList?.find(e=> e.iso_639_1 === drop.iso_639_1)?.english_name || 'no laguage' }
                                />
                        ))
                    }
                </div>
            </div>
            : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchImagesData}/>
        }
    </div>
  )
}

export default BackdropsPosters;