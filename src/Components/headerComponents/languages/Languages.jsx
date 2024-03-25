import { useContext, useState } from "react"
import { globalContext } from "../../../GlobalStateContext/GlobalContext"
import SearchIcon from '@mui/icons-material/Search';
import "../../mediaFilterComponents/languages&countries/LangCountries.scss"

const Languages = () => {

    const {Languages} = useContext(globalContext);

    const [filteredLanguages,setFilteredLanguages] = useState(Languages)

    const [selectedLang,setSelectedLang] = useState('english')

  return (
    <div className="main-lang ">
        <div className="lang-container">
            <h4 className="c-ti"> {selectedLang}</h4>
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
                        filteredLanguages?.map((lang)=> {
                            <li 
                                className="nav-btn" 
                                key={lang?.iso_639_1}
                                >
                                    {lang?.english_name}
                            </li>
                        })
                    }
                </ul>
            </div>
            {/* lang?.iso_639_1 : lang?.iso_3166_1 ,lang?.english_name */}

        </div>
    </div>
  )
}

export default Languages;