import { useContext } from 'react';
import './mainLoding.scss';
import { globalContext } from '../../GlobalStateContext/GlobalContext';

const MainLoaing = () => {

  const {theme} = useContext(globalContext);
  return (
    <div className={`back-color-${theme} main-loaing`}>
        <div className="loader-container">
            <div className="left"></div>
            <div className="right"></div>
        </div>
    </div>
  )
}

export default MainLoaing