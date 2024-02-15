import { useContext, useEffect, useState } from "react";
import fetchData from "../../../../Utilities/fetchData";
import { globalContext } from "../../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import SearchIcon from '@mui/icons-material/Search';

import "./Languages.scss";
import { meidaFilter } from "../../../../Pages/FilteredMediaList/FilteredMediaList";

const Languages = () => {

    const {setMediaFiltering} = useContext(meidaFilter);

    const [languages,setLanguages] = useState([]);
    const [filterdLanguages,setFilterdLanguages] = useState([]);
    const [showLangList,setShowLangList] = useState(false);
    const [selectedLanguage,setSelectedLanguage] = useState('none seleted');

    const {lang} = useContext(globalContext);

    const {filter} = useParams();

    useEffect(()=>{
        fetchData(`configuration/languages `)
        .then((data)=>{
            setLanguages(data);
            setFilterdLanguages(data)
        })
        
    },[lang,filter]);

    const handleFiltering = (e)=> {

        const valuelower = e.target.value.toLowerCase();
        const  newLang = languages.filter((el)=> el.english_name.toLowerCase().indexOf(valuelower) === 0);

        setFilterdLanguages(newLang);
    };

    const selectLang = (langName,lang)=> {
        setMediaFiltering(prev=> {
            return {
                ...prev,
                with_original_language: langName
            }
        });
        setShowLangList(false);
        setSelectedLanguage(lang)
    }

  return (
    <div className="lang-container">
        <h5 className="c-ti">
            language
        </h5>
        <div className="selections" onClick={()=> setShowLangList(!showLangList)}>
            <span>{selectedLanguage}</span> 
            <span><ArrowDropDownIcon /></span> 
            
        </div>
        {
            showLangList &&
            <div className="lang-box">
                <header className="lang-header">
                    <div className="search-input">
                        <input 
                            onKeyUp={(e)=> handleFiltering(e)}
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
                                <li onClick={()=> selectLang('none selected','none selected')}
                                    className={`${selectedLanguage === 'none selected' && "active"} lang-li`}
                                    >
                                      none selected
                                </li>
                        {
                            filterdLanguages?.map((lang)=>(
                                <li onClick={()=> selectLang(lang?.iso_639_1,lang?.english_name)}
                                    className={`${selectedLanguage === lang.english_name && "active"} lang-li`}
                                    key={lang?.iso_639_1}
                                    >
                                        {lang?.english_name}
                                </li>
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