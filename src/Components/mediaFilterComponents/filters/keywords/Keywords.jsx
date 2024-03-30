import { useContext, useState } from "react"
import { mediaFilter } from "../../../../Pages/filteredMediaList/FilteredMediaList";
import fetchData from "../../../../utilities/fetchData";

import ClearIcon from '@mui/icons-material/Clear';

import "./Keywords.scss";
import { languages } from "../../../../utilities/languages";
import { globalContext } from "../../../../GlobalStateContext/GlobalContext";
import Loading from "../../../loading/Loading";
import Error from "../../../error/Error";

const Keywords = () => {

    const {mediaFiltering,setMediaFiltering} = useContext(mediaFilter);
    const {lang,theme} = useContext(globalContext);

    const [keys,setKeys] = useState([]);
    const [error,setError] = useState(null);
    const [isPending,setIsPending] = useState(false);
    const [isAutoCompList,setIsAutoCompList] = useState(false);

    const fetchKeysData = (query) => {
        if(query.length > 1){
            setIsPending(true);
            setError(null);
            fetchData(`search/keyword?query=${query}&page=1`)
            .then((data)=> {
                setKeys(data?.results)
            })
            .catch(error=> {
                setError(error)
            })
            .finally(()=> {
                setIsPending(false)
            })
        }
    };

    const handleKeysContext = (key)=> {
        setMediaFiltering(prev=> {
            return {
                ...prev,
                with_keywords: prev.with_keywords?.includes(key) ? prev.with_keywords.filter(el=> el !== key) : [...prev.with_keywords,key]
            }
        });
        setIsAutoCompList(false);
    }

  return (
    <div className="keywords-filter">
        <h5 className={`t-color-${theme} c-ti`}>
           {languages[lang].keywords}
        </h5>
        <div className={`${isAutoCompList} key-box`}>
            <ul className="keys">
                {
                    mediaFiltering?.with_keywords?.map((key)=>(
                        <li 
                            className={`t-color-${theme}-2 link-hover card`}
                            key={key} 
                            >
                            {key}
                            <ClearIcon onClick={()=> handleKeysContext(key)}  />
                        </li>
                    ))
                }
            </ul>
            <input 
                className={`t-color-${theme}-1 keys-input`}
                type="search" 
                onChange={(e)=> fetchKeysData(e.target.value)} 
                onFocus={()=> setIsAutoCompList(true)}
                onBlur={(e)=> {setTimeout(()=> {
                    setIsAutoCompList(false);
                    e.target.value = '';
                    setKeys([])
                },500)}}
                placeholder={lang === 'en' ? "filter by keywords" : "فرز بواسطةالكلمات الدالة"}
                />
        </div>
        {
            isAutoCompList &&
            <div className={`back-color-${theme}-2 auto-fill`}>
                <ul className="keys-ul">
                    {
                         isPending ? <Loading height='100px'/> : 
                         keys ?
                        keys?.map((key)=>(
                            <li 
                                className={`${mediaFiltering?.with_keywords?.includes(key?.name) && "active"} t-color-${theme} link-hover`}
                                key={key?.id} 
                                onClick={()=> handleKeysContext(key?.name)}
                                >
                                {key?.name}
                            </li>
                        ))
                        : error && <Error error={error} height='100px' onClick='' />
                    }

                </ul>
            </div>
        }
    </div>
  )
}

export default Keywords