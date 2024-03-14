import { createContext, useState } from "react"

export const globalContext = createContext();

const GlobalContext = ({children})=> {

    const [theme,setTheme] = useState('dark');
    const [lang,setLang] = useState('en');
    const [trailer,setTrailer] = useState({isTrailer: false,youtubeId : null,type: null});

    

    return (
       <globalContext.Provider value={{theme,setTheme,lang,setLang,trailer,setTrailer}}>
           {children}
       </globalContext.Provider>
    );

};

export default GlobalContext;