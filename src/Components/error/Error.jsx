import { useContext } from 'react';
import {globalContext} from "../../GlobalStateContext/GlobalContext";
import './error.scss';

const Error = ({error,height,onClick}) => {

  const {lang,theme} = useContext(globalContext);
  return (
    <div 
        className={`back-color-${theme} error`}
        style={{height}}
        >
        <div className="error-container" >
            <p className={`t-color-${theme}-3 er-m`}>
               {error?.response?.data?.message ?? error?.message}
            </p>
            <button 
                  onClick={onClick}
                  className={`try-btn link-hovor t-color-${theme}`} 
                  type="button"
                  > 
                    {lang === 'en' ? 'try agin' : 'حاول مرة اخرى'}
            </button>
        </div>
    </div>
  )
}

export default Error