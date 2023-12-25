import { createContext, useState } from "react"

export const globalContext = createContext();

const GlobalContext = ({children})=> {

    const [theme,setTheme] = useState('dark');
    const [lang,setLang] = useState('en');

    return (
       <globalContext.Provider value={{theme,setTheme,lang,setLang}}>
           {children}
       </globalContext.Provider>
    );

};

export default GlobalContext;