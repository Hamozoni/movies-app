import { useContext, useEffect, useState } from "react"
import fetchData from "../../../utilities/fetchData";
import { useParams } from "react-router-dom";

import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckIcon from '@mui/icons-material/Check';

import "./backdrops&posters.scss";
import Loading from "../../../Components/loading/Loading";
import Error from "../../../Components/error/Error";
import { mediaColorContext } from "../../../GlobalStateContext/MediaColorContext";


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

const Backdrops_posters = ({mediaType,type,isSeason = false,isEpisode = false}) => {

    const {color} = useContext(mediaColorContext);

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(true);

    const [dataLang,setDataLang] = useState([]);
    const [error2,setError2] = useState(null);
    const [isPending2,setIsPending2] = useState(true);
    const [selectedLang,setSelectedLang] = useState('null');

    const {id,seasonNumber,episodeNumber} = useParams();

    const fetchImagesData = ()=> {

        setIsPending(true);
        setError(null);
        let season = '';
        if(isSeason) {
            season = `/season/${seasonNumber}`
        }
        if(isEpisode){
            season = `/season/${seasonNumber}/episode/${episodeNumber}` 
        }
        fetchData(`${mediaType}/${id}${season}/images`)
        .then((data)=>{
            setData(Object.groupBy(data[type],e=> e.iso_639_1));
            console.log(Object.groupBy(data[type],e=> e.iso_639_1))
            setSelectedLang(Object.keys(Object.groupBy(data[type],e=> e.iso_639_1))[0]);
            setIsPending(false);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });
    };

    const fectLangData = ()=> {

        setIsPending2(true);
        setError2(null);

        fetchData(`configuration/languages`)
        .then(lang=> {
            setDataLang(lang);
            setIsPending2(false)
            console.log(lang)
        })
        .catch(error=> {
            setError2(error);
            setIsPending2(false);
        });
    }


    useEffect(()=> {

        fetchImagesData();
        fectLangData()

    },[mediaType,id,type]);


  return (
    <div className="backdrops">
        <div className="backdrop-container">
            <nav className="back-nav card">
                <header 
                    style={{backgroundColor: color.backColor}}
                    className="b-header">
                    <h4 style={{color: color.textColor}}>{type}</h4>
                </header>
                <ul className="lang-ul">
                    {
                        isPending2 ? <Loading width='100%' height='400px' /> 
                        : (data && dataLang) ?
                        Object.keys(data)?.map((key)=>(
                            <li onClick={()=> setSelectedLang(key)} className={`${selectedLang === key && 'active'} nav-btn`}>
                                { key === 'null' ? 
                                  'no language' :
                                   dataLang?.find(e=> e.iso_639_1 === key)?.english_name
                                }
                                <span>{data[key]?.length}</span>
                            </li>
                        )) 
                        : error2 && <Error error={error2} height='400px' onClick={fectLangData} />
                    }
                </ul>
            </nav>
            <div className="back-content">
                {
                    isPending ? <Loading width='80%' height='calc(100vh - 100px)' /> 
                    : data ?
                    data[selectedLang]?.map((drop)=> (
                        <BackdropsCard 
                            key={drop} 
                            drop={drop} 
                            language={dataLang?.find(e=> e.iso_639_1 === drop.iso_639_1)?.english_name || 'no laguage' }
                            />
                    ))
                    : error && <Error error={error} height='calc(100vh - 100px)' onClick={fetchImagesData}/>
                }
            </div>
        </div>
    </div>
  )
}

export default Backdrops_posters;