import { createContext } from "react"

export const mediaColorContext = createContext();

const rgbColor = {
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255),
  };
  
  const textColor = { 
    color: `rgb(${rgbColor.r < 125 ? 0 : 240} ${rgbColor.g < 125 ? 240  : 0} ${rgbColor.b < 125 ? 240  : 0}`
  }
  
  const backColor = {
  backgroundColor: `rgb(${rgbColor.r} ${rgbColor.g} ${rgbColor.b}`
  }

const MediaColorContext = ({children}) => {
  return (
    <mediaColorContext.Provider value={{textColor,backColor}}>
        {children}
    </mediaColorContext.Provider>
  )
}

export default MediaColorContext