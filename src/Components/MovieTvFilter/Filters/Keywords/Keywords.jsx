import { useContext, useState } from "react"
import { movieFilter } from "../../../../Pages/Movies/Movies";
import fetchData from "../../../../Utilities/fetchData";

const Keywords = () => {

    const [moviesFilter,setMoviesFilter] = useContext(movieFilter);
    const [keys,setKeys] = useState([]);

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
        })
    }

  return (
    <section className="keywords-filter">
        <h4 className="">
           Keywords
        </h4>
        <div className="key-box">
            <ul className="keys">
                {
                    moviesFilter?.with_keywords?.map((key)=>(
                        <li key={key} >
                            {key}
                        </li>
                    ))
                }
            </ul>
            <input 
                type="search" 
                onChange={(e)=> fetchKeysData(e.target.value)} 
                placeholder="filter by keywords"
                />
            <ul className="auto-fill">
                 {
                    keys?.map((key)=>(
                        <li key={key?.id} onClick={()=> handleKeysContext(key?.name)}>
                            {key?.name}
                        </li>
                    ))
                 }
            </ul>
        </div>
    </section>
  )
}

export default Keywords