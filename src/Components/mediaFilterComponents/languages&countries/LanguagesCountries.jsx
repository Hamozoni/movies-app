import { useContext, useState } from "react";
import { mediaFilter } from "../../../Pages/filteredMediaList/FilteredMediaList";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import SearchIcon from '@mui/icons-material/Search';
import "./LangCountries.scss"

const LanguagesCountries = ({type,data}) => {

    const {setMediaFiltering} = useContext(mediaFilter);

    const [filterdData,setFilterdData] = useState(data);
    const [showDataList,setShowDataList] = useState(false);
    const [selectedLanguage,setSelectedLanguage] = useState('none seleted');

    const handleFiltering = (e)=> {

        const valuelower = e.target.value.toLowerCase();
        const  newLang = data.filter((el)=> el.english_name.toLowerCase().indexOf(valuelower) === 0);

        setFilterdData(newLang);
    };


    const selectData = (langCode,langName)=> {
        if(type === 'languages'){
            setMediaFiltering(prev=> {
                return {
                    ...prev,
                    with_original_language: langCode
                }
            });
        }else {
            setMediaFiltering(prev=> {
                return {
                    ...prev,
                    watch_region: langCode
                }
            });  
        }
        setShowDataList(false);
        setSelectedLanguage(langName)
    };

  return (
    <div className="lang-container">
        <h5 className="c-ti">
            {type}
        </h5>
        <h4 className="selections card" onClick={()=> setShowDataList(!showDataList)}>
             {selectedLanguage}
             {showDataList ?<ArrowDropDownIcon /> : <ArrowRightIcon /> } 
            
        </h4>
        {
            showDataList &&
            <div className="lang-box card">
                <header className="lang-header">
                    <div className="search-input">
                        <input 
                            onKeyUp={(e)=> handleFiltering(e)}
                            className="search-in"
                            type="search" 
                            />
                            <SearchIcon />
                    </div>
                </header>
                <div className="lang">
                    <ul className="lang-ul">
                        {  type === 'languages' &&
                            <li onClick={()=> selectData('none selected','none selected')}
                                className={`${selectedLanguage === 'none selected' && "active"} nav-btn`}
                                >
                                    none selected
                            </li>
                        }
                        {
                            filterdData?.map((lang)=>(
                                <li 
                                    onClick={()=> selectData(type === 'languages' ?  lang?.iso_639_1 : lang?.iso_3166_1 ,lang?.english_name)}
                                    className={`${selectedLanguage === lang.english_name && "active"} lang-li nav-btn`}
                                    key={lang.english_name}
                                    >
                                        {
                                             type === 'countries' && 
                                             <span>
                                                 <img src={`https://flagsapi.com/${lang?.iso_3166_1 }/shiny/64.png`} alt='flag'/>
                                             </span>
                                        }
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

export default LanguagesCountries