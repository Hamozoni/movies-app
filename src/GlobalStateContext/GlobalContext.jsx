import { createContext, useState } from "react"

export const globalContext = createContext();

const GlobalContext = ({children})=> {

    const [theme,setTheme] = useState('dark');
    const [lang,setLang] = useState('en');
    const [isTrailer,setIsTrailer] = useState(false);
    const [mediaType,setMediaType] = useState(null);
    const [mediaId,setMediaId] = useState(null);

    

    return (
       <globalContext.Provider value={{theme,setTheme,lang,setLang,isTrailer,setIsTrailer,mediaType,setMediaType,mediaId,setMediaId}}>
           {children}
       </globalContext.Provider>
    );

};

export default GlobalContext;