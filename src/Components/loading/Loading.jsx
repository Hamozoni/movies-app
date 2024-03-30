import { useContext } from 'react';
import './loading.scss';
import { globalContext } from '../../GlobalStateContext/GlobalContext';

const Loading = ({width = '100%',height}) => {
  const {theme} = useContext(globalContext);

  return (
    <div className={`loading back-color-${theme}`}>
        <div 
            className="loading-container"
            style={{width,height}}
            >
            <div className="spin">
            </div>
        </div>
    </div>
  )
}

export default Loading