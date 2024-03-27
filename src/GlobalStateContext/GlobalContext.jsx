import { createContext, useEffect, useState } from "react"
import fetchData from "../utilities/fetchData";
import Loading from "../Components/loading/Loading";
import Error from "../Components/error/Error";

export const globalContext = createContext();

const GlobalContext = ({children})=> {

    const [theme,setTheme] = useState('dark');
    const [lang,setLang] = useState('en');
    const [trailer,setTrailer] = useState({isTrailer: false,youtubeId : null,type: null});
    const [innerWidth,setInnerWidth] = useState(0);
    const [languages,setLanguages] = useState(null);
    const [countries,setCountries] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);



    const fetchLanguages = ()=> {

        setIsPending(true);
        setError(null);
        fetchData(`configuration/languages`)
        .then(lang=> {
            setLanguages(lang);
            fetchData(`configuration/countries?language=en-US`)
            .then((country)=> {
                setCountries(country);
            })
            .catch(error=> {
                setError(error);
            });
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=> {
            setIsPending(false);
        })
    };

    useEffect(()=> {

        if(window.localStorage.getItem('myh-movies-lang') === null){
            window.localStorage.setItem('myh-movies-lang',lang);
        }else {
            setLang(window.localStorage.getItem('myh-movies-lang'))
        };

        document.getElementsByTagName('html')[0].lang = lang;
        if(lang === 'ar') {
           document.getElementsByTagName('html')[0].dir = 'rtl'
        }else {
            document.getElementsByTagName('html')[0].dir = 'ltr'
        }

        console.log(document.getElementsByTagName('html')[0].lang)
    },[lang])

    useEffect(fetchLanguages,[]);

    useEffect(()=>{
          setInnerWidth(window.innerWidth)
       const handleResize = (e)=> {
          setInnerWidth(e.target.innerWidth);
       }
        window.addEventListener('resize',handleResize);

        return ()=> window.removeEventListener('resize',handleResize)
    },[]);

    

    return (
       <globalContext.Provider 
            value={{
                theme,
                setTheme,
                lang,
                setLang,
                trailer,
                setTrailer,
                innerWidth,
                countries,
                languages
            }}
        >
           { isPending ? <Loading width='100%' height='calc(100vh - 100px)' /> 
              : (languages && countries) ?  children 
              : error && 
              <Error
                   error={error} 
                   height='calc(100vh - 100px)' 
                   onClick={fetchLanguages}
                />
            }
       </globalContext.Provider>
    );

};

export default GlobalContext;