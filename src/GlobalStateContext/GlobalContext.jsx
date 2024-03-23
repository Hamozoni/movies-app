import { createContext, useEffect, useState } from "react"

export const globalContext = createContext();

const GlobalContext = ({children})=> {

    const [theme,setTheme] = useState('dark');
    const [lang,setLang] = useState('en');
    const [trailer,setTrailer] = useState({isTrailer: false,youtubeId : null,type: null});
    const [innerWidth,setInnerWidth] = useState(0);

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
                innerWidth
            }}
        >
           {children}
       </globalContext.Provider>
    );

};

export default GlobalContext;