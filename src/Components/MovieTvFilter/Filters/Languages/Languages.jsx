import { useContext, useEffect, useState } from "react";
import fetchData from "../../../../Utilities/fetchData";
import { globalContext } from "../../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import SearchIcon from '@mui/icons-material/Search';

import "./Languages.scss";

const Languages = () => {

    const [languages,setLanguages] = useState([]);
    const [showLangList,setShowLangList] = useState(false);

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{
        fetchData(`configuration/languages `)
        .then((data)=>{
            setLanguages(data);
        })
        
    },[lang,filter]);

  return (
    <div className="lang-container">
        <h5 className="c-ti">
            language
        </h5>
        <div className="selections" onClick={()=> setShowLangList(!showLangList)}>
            <span>none seleted</span> 
            <span><ArrowDropDownIcon /></span> 
            
        </div>
        {
            showLangList &&
            <div className="lang-box">
                <header className="lang-header">
                    <div className="search-input">
                        <input 
                            className="search-in"
                            type="search" 
                            />
                            <span>
                                <SearchIcon />
                            </span>
                    </div>
                </header>
                <div className="lang">
                    <ul className="lang-ul">
                        {
                            languages?.map((lang)=>(
                                <li className="lang-li " key={lang?.iso_639_1}>{lang?.english_name}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        }
    </div>
  )
}

export default Languages