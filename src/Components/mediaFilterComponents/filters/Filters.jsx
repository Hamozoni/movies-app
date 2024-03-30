import { useContext, useEffect, useState } from "react";
import SortingGauge from "./sortingGauge/SortingGauge"
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useParams } from "react-router-dom";
import fetchData from "../../../utilities/fetchData";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { languages as languagesList } from "../../../utilities/languages";

import "./Filters.scss";
import { mediaFilter } from "../../../Pages/filteredMediaList/FilteredMediaList";
import Keywords from "./keywords/Keywords";
import LanguagesCountries from "../languages&countries/LanguagesCountries";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";

const Filters = () => {

    const {mediaFiltering,setMediaFiltering} = useContext(mediaFilter);

    const [genres,setGenres] = useState(null);
    const [isOpen,setIsOpen] = useState(false);
    const [isPending,setIsPending] = useState(false);
    const [error,setError] = useState(null);


    const {lang,languages,theme} = useContext(globalContext);

    const {filter} = useParams();

    const fetchGenres = ()=> {

        setIsPending(true);
        setError(null);
        fetchData(`genre/movie/list?language=${lang}`)
        .then((data)=>{
            setGenres(data?.genres);
        })
        .catch(error=> {
            setError(error)
        })
        .finally(()=>{
            setIsPending(false)
        })
   
    }

    useEffect(fetchGenres,[lang,filter]);

  return (
    <section className="sort card">
        <h5 
            className={`t-color-${theme} filter-t b-b`} 
            onClick={()=> setIsOpen(!isOpen)}
            >
            {languagesList[lang].filters} {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </h5>
        {
            isOpen &&
            <div className="fliter-content">
                <section className="sort-content">
                    <h5 className={`c-ti t-color-${theme}`}>
                        {languagesList[lang].showMe}
                    </h5>
                    <div className="show-content">
                        <div className="option">
                            <input 
                                className={`c-ti t-color-${theme}-2`}
                                type="radio" 
                                name="show-me" 
                                id="everything"
                                 />
                            <label 
                                className={`c-ti t-color-${theme}-2`}
                                htmlFor="everything"
                                >
                                {languagesList[lang]?.everything}
                            </label>
                        </div>
                        <div className="option">
                            <input 
                                className={`c-ti t-color-${theme}-2`}
                                type="radio" 
                                name="show-me" 
                                id="haven't" 
                                />
                            <label 
                                className={`c-ti t-color-${theme}-2`}
                                htmlFor="haven't"
                                >
                                    {languagesList[lang].movies} {languagesList[lang].havent} 
                            </label>
                        </div>
                        <div className="option">
                            <input 
                                className={`c-ti t-color-${theme}-2`}
                                type="radio"
                                name="show-me" 
                                id="have"
                                 />
                            <label
                                className={`c-ti t-color-${theme}-2`} 
                                htmlFor="have"
                                >
                                    {languagesList[lang].movies} {languagesList[lang].haveSeen}
                            </label>
                        </div>

                    </div>
                </section>
                <section className="sort-content b-b">
                    <h5 className={`c-ti t-color-${theme}`}>
                        {languagesList[lang].dates}
                    </h5>
                    <div className="release-cont">
                        <div className="release-date">
                            <label 
                                className={`t-color-${theme}-2 c-ti`}
                                htmlFor="from-date"
                                > 
                                   {languagesList[lang].from}
                            </label>
                            <input 
                                onBlur={(e)=> setMediaFiltering(prev=> {return {...prev,'release_date.gte': [e.target.value]}})} 
                                type="date" 
                                id="from-date"
                                lang={lang} 
                                className={`t-color-${theme}-2 back-color-${theme}-1`}
                                />

                        </div>
                        <div className="release-date">
                            <label 
                                className={`t-color-${theme}-2 c-ti`} 
                                htmlFor="to-date"
                                > 
                                {languagesList[lang].to}
                            </label>
                            <input
                                onBlur={(e)=> setMediaFiltering(prev=> {return {...prev,'release_date.lte': [e.target.value]}})} 
                                type="date" 
                                name="to-date" 
                                id="to-date"
                                lang={lang}
                                className={`t-color-${theme}-2 back-color-${theme}-1`}
                                />
                        </div>
                    </div>
                </section>
                <section className="sort-content">
                    <h5 className={`t-color-${theme} c-ti`} >
                        {languagesList[lang].genres}
                    </h5>
                    <nav className="gen-nav">
                        <ul className="genr-ul">
                            { 
                              isPending ? <Loading width='100%'  height='300px'/> :
                              genres ?
                                genres?.map((gen)=>(
                                    <li 
                                        className={`${mediaFiltering.with_genres?.includes(gen.name) && 'active'} t-color-${theme}-1 scale link-hoher`}
                                        onClick={()=> setMediaFiltering(prev=> {
                                            return {
                                                ...prev,
                                                with_genres : prev?.with_genres?.includes(gen.name) ? 
                                                    prev?.with_genres.filter((el)=> el !== gen.name) :
                                                    [...prev?.with_genres,gen.name] 
                                            }
                                        })}
                                        key={gen?.id}
                                        >
                                            {gen?.name}
                                </li>
                                ))
                                : error && <Error error={error} height='300px' onClick={fetchGenres}/>
                            }
                        </ul>
                    </nav>
                </section>
                <section className="sort-content">
                    <LanguagesCountries type='language' data={languages} />
                </section>
                <section className="sort-content">
                <SortingGauge  title={lang === 'en' ?  "Minimum User Votes" : 'تقيم المستخدمين'} renderFrom='rating'/>
                </section>
                {/* <section className="sort-content">
                <SortingGauge />
                </section> */}
                <section className="sort-content">
                <SortingGauge title={lang === 'en' ? 'runtime' :  'مدة التشغيل'} renderFrom='runtime'/>
                </section>
                <section className="sort-content">
                    <Keywords />
                </section>
            </div>
        }
    </section>
  )
}

export default Filters