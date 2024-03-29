import { useContext } from 'react';
import {globalContext} from "../../GlobalStateContext/GlobalContext";
import './error.scss';

const Error = ({error,height,onClick}) => {

  const {lang,theme} = useContext(globalContext);
  return (
    <div className="error" style={{height}}>
        <div className="error-container" >
            <h3 className={`t-color-${theme}-3 er-m`}>
               {error?.message}
            </h3>
            <button 
                  onClick={onClick}
                  className={`try-btn t-color-${theme}`} 
                  type="button"
                  > 
                    {lang === 'en' ? 'try agin' : 'حاول مرة اخرى'}
            </button>
        </div>
    </div>
  )
}

export default Error