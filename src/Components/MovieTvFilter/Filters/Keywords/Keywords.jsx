import { useContext, useState } from "react"
import { movieFilter } from "../../../../Pages/Movies/Movies";
import fetchData from "../../../../Utilities/fetchData";

import ClearIcon from '@mui/icons-material/Clear';

import "./Keywords.scss";

const Keywords = () => {

    const [moviesFilter,setMoviesFilter] = useContext(movieFilter);
    const [keys,setKeys] = useState([]);
    const [isAutoCompList,setIsAutoCompList] = useState(false);

    const fetchKeysData = (query) => {
        if(query.length > 1){
            fetchData(`search/keyword?query=${query}&page=1`)
            .then((data)=> {
                setKeys(data?.results)
            })
        }
    };

    const handleKeysContext = (key)=> {
        setMoviesFilter(prev=> {
            return {
                ...prev,
                with_keywords: prev.with_keywords?.includes(key) ? prev.with_keywords.filter(el=> el !== key) : [...prev.with_keywords,key]
            }
        });
        setIsAutoCompList(false);
    }

  return (
    <div className="keywords-filter">
        <h5 className="c-ti">
           Keywords
        </h5>
        <div className={`${isAutoCompList} key-box`}>
            <ul className="keys">
                {
                    moviesFilter?.with_keywords?.map((key)=>(
                        <li key={key} >
                            {key}
                            <ClearIcon onClick={()=> handleKeysContext(key)}  />
                        </li>
                    ))
                }
            </ul>
            <input 
                className="keys-input"
                type="search" 
                onChange={(e)=> fetchKeysData(e.target.value)} 
                onFocus={()=> setIsAutoCompList(true)}
                onBlur={()=> setTimeout(()=> setIsAutoCompList(false),500)}
                placeholder="filter by keywords"
                />
        </div>
        {
            isAutoCompList &&
            <div className="auto-fill">
                <ul className="keys-ul">
                    {
                        keys?.map((key)=>(
                            <li 
                                className={moviesFilter?.with_keywords?.includes(key?.name) && "active"}
                                key={key?.id} 
                                onClick={()=> handleKeysContext(key?.name)}
                                >
                                {key?.name}
                            </li>
                        ))
                    }

                </ul>
            </div>
        }
    </div>
  )
}

export default Keywords