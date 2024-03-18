import { useEffect, useState } from "react";
import { createContext } from "react"
import { useParams } from "react-router-dom";

export const mediaColorContext = createContext();



const MediaColorContext = ({children}) => {

    const [color,setColor] = useState({textColor: '',backColor:''})

    const {id} = useParams();

    useEffect(()=> {

        const rgbColor = {
            r: Math.floor(Math.random() * 65),
            g: Math.floor(Math.random() * 50),
            b: Math.floor(Math.random() * 65),
          };

          const textColor = `rgb(${rgbColor.r < 125 ? 0 : 240} ${rgbColor.g < 125 ? 240  : 0} ${rgbColor.b < 125 ? 240  : 0})`
          
          const backColor = `rgb(${rgbColor.r} ${rgbColor.g} ${rgbColor.b})`

          setColor({textColor,backColor})
        
    },[id]);

  return (
    <mediaColorContext.Provider value={{color}}>
        {children}
    </mediaColorContext.Provider>
  )
}

export default MediaColorContext