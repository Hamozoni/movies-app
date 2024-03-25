import { useContext, useState } from "react"
import { globalContext } from "../../../GlobalStateContext/GlobalContext"
import SearchIcon from '@mui/icons-material/Search';
import "../../mediaFilterComponents/languages&countries/LangCountries.scss";

import "./languages.scss";

const Languages = () => {

    const {languages,lang,setLang} = useContext(globalContext);

    const [filteredLanguages,setFilteredLanguages] = useState(languages)


    console.log(languages);

    const handleFiltering = (e)=> {

        const searchInputValue = e.target.value.toLowerCase();

        let newFliterLang = languages.filter(e => e.english_name.toLowerCase().startsWith(searchInputValue));

        setFilteredLanguages(newFliterLang)

    }

  return (
    <div className="lang-box card ">
        <h4 className="lang-ti"> {languages.find( e=> e.iso_639_1 === lang).english_name}</h4>
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
                {
                    filteredLanguages?.sort()?.map((language)=> (
                        <li 
                            onClick={()=> setLang(language?.iso_639_1)}
                            className={`${language?.iso_639_1 === lang && 'active'} nav-btn`}
                            key={language?.iso_639_1}
                            >
                                {language?.english_name}
                        </li>

                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Languages;