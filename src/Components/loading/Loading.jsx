
import './loading.scss';

const Loading = ({width = '100%',height}) => {

  return (
    <div className={`loading `}>
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